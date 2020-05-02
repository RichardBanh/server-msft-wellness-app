const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./Config/config.env" });
const app = express();

const connectData = require('./Config/db')

connectData()

const consoleLogger = require("./Middleware/middleware");

//CRUD
const dataRoute = require("./Routes/dataRoute");

// middleware
app.use(consoleLogger);

//routes
app.use("/", dataRoute);

//configuration
const port = process.env.PORT || 5000; // change it in the terminal 'export PORT=5000'
const serve = app.listen(port, () => console.log(`Listening on port ${port}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error is: ${err.message}`);
  serve.close(() => process.exit(1))
})