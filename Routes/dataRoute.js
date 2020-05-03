const express = require("express");
const {getData, createUser, getUser, deletUserfromActivity, addActivity, getActivity, upActivity} = require("../Controllers/dataController")
const router = express.Router();

router.route("/").get(getData)

router.route("/createUser").post(createUser)

router.route("/user").get(getUser)

router.route("/activity").get(getActivity)

router.route("/activity").put(addActivity)

router.route("/activity").post(upActivity)

router.route("/activity").delete(deletUserfromActivity)
module.exports = router;