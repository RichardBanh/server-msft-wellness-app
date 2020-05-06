const express = require("express");
const {
  createUser,
  getUser,
  deletUserfromActivity,
  addActivity,
  getActivity,
  upActivity,
  upUser,
  loginUser,
  logout,
} = require("../Controllers/dataController");
const { protection } = require("../Middleware/middleware");
const router = express.Router();

router.route("/createUser").post(createUser);

router.route("/user").get(protection, getUser);

router.route("/user").put(protection, upUser);
router.route("/login").get(loginUser);
router.route("/logout").get(logout);
router.route("/activity").get(protection, getActivity);

router.route("/activity").post(protection, addActivity);

router.route("/activity").post(protection, upActivity);

router.route("/activity").delete(protection, deletUserfromActivity);
module.exports = router;
