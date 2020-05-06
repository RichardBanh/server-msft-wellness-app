const express = require("express");
const {
  createUser,
  getUser,
  deletUserfromActivity,
  addActivity,
  getActivity,
  upActivity,
  upUser, loginUser
} = require("../Controllers/dataController");
const router = express.Router();

router.route("/createUser").post(createUser);

router.route("/user").get(getUser);

router.route("/user").put(upUser);
router.route("/login").get(loginUser)

router.route("/activity").get(getActivity);

router.route("/activity").post(addActivity);

router.route("/activity").post(upActivity);

router.route("/activity").delete(deletUserfromActivity);
module.exports = router;
