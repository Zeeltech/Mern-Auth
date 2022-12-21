const mongoose = require("mongoose");

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, //user no type mongoose.Schema.Types.ObjectId create kryo
      required: true,
      ref: 'User' // we will call it user
    },
    text: {
      type: String,
      requires: [true, "Please add text value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Goal", goalSchema);
