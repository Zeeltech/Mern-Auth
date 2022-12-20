const express = require("express");
const dotenv = require("dotenv").config();
const router = require("./routes/goalRoutes");
const userrouter = require("./routes/userRoutes");
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", router);
app.use("/api/users", userrouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on ${port}`));
