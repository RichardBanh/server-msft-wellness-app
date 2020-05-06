const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./Config/config.env" });
const app = express();
app.use(express.json());
const connectData = require("./Config/db");
const cookieparser = require("cookie-parser");
const sanitizer = require("express-mongo-sanitize");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const { consoleLogger } = require("./Middleware/middleware");
//connection
connectData();

app.use(cors());

//Api protection
const Limit = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });
app.use(Limit);

app.use(sanitizer());
app.use(helmet());
app.use(xss());

//CRUD
const dataRoute = require("./Routes/dataRoute");

// middleware
app.use(consoleLogger);

//routes
app.use("/", dataRoute);

//configuration
const port = process.env.PORT || 5000; // change it in the terminal 'export PORT=5000'
const serve = app.listen(port, () => console.log(`Listening on port ${port}`));

// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Error is: ${err.message}`);
//   serve.close(() => process.exit(1));
// });
