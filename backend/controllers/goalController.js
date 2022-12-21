const asyncHandler = require("express-async-handler");
//express-async-handler jethi try catch no nakhvu pde
//hve asyncHandler thi wrap kri daiye async function ne

const Goal = require("../models/goalModel");
const User = require("../models/userModel");

// @desc Get goals
// @route GET /api/goals
// @access Private

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });

  res.status(200).json({ goals });
});

// @desc Set goals
// @route POST /api/goals
// @access Private

const setGoals = asyncHandler(async (req, res) => {
  //req.body.text ma req request chhe ane body chhe e postman ma chhe jo and text chhe e attribute nu naam kahi ski e pan postman ma chhe
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text message");
  }

  //text chhe e attribute levanu postman body mathi
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id, //authMiddleware ma aapne find kryu user and req.user ma ene store kryu now we are accessing it
  });

  res.status(200).json({ goal });
});

// @desc Update goals
// @route PUT /api/goals/:id
// @access Private

const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  //STARTS FOR AUTH
  const user = await User.findById(req.user.id);
  //Check if user request
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure logged in user matches goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not matched");
  }
  //END FOR AUTH
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({ updatedGoal });
});

// @desc Delete goals
// @route DELETE /api/goals/:id
// @access Private

const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const user = await User.findById(req.user.id);

  //Check if user request
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Make sure logged in user matches goal user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not matched");
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
};
