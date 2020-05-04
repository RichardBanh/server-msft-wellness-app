const { userModel, challengesModel } = require("../DataModels/dataModel");

exports.getData = (req, res, next) => {
  res.status(200).json({ success: true, msg: "get all data" });
};

exports.createUser = async (req, res, next) => {
  try {
    const dataUser = await userModel.create(req.body);
    res.status(201).json({
      success: true,
      msg: `user created ${req.params}`,
      data: dataUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, whathappened: error });
  }
};

exports.getUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get one user ${req.params.id}` });
};

exports.deletUserfromActivity = (req, res, next) => {
  res.status(200).json({ success: true, msg: `deleted user from activity` });
};

exports.addActivity = async (req, res, next) => {
  try {
    const dataActivity = await challengesModel.create(req.body);
    res.status(201).json({
      success: true,
      msg: `activity created ${req.params}`,
      data: dataActivity,
    });
  } catch (error) {
    res.status(400).json({ success: false, whathappened: error });
  }
};

exports.getActivity = (req, res, next) => {
  res.status(200).json({ success: true, msg: "get activities" });
};

exports.upActivity = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `updated this activity ${req.params.id}` });
};
