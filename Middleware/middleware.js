const jwt = require("jsonwebtoken");
const { userModel } = require("../DataModels/dataModel");

const consoleLogger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  var start = process.hrtime();

  res.on("finish", function () {
    var hrtime = process.hrtime(start);
    var elapsed = parseFloat(hrtime[0] + (hrtime[1] / 1000000).toFixed(3), 10);
    console.log(elapsed + "ms");
  });
  next();
};

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const protection = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookie.token) {
    token = req.cookie.token;
  }
  if (!token) {
    res.status(401).json({ message: "not authorized" });
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userModel.findById(decoded.id);
      console.log(req.user)
      next();
    } catch (error) {
      res.status(401).json({ message: "not authorized" });
    }
  }
};
module.exports = { consoleLogger, asyncHandler, protection };
