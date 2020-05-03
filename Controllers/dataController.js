const {userModel, challengesModel} = require("../DataModels/dataModel");

exports.getData = (req, res, next) => {
  res.status(200).json({ success: true, msg: "get all data" });
};

exports.createUser = async (req, res, next) => {
  const dataUser = await userModel.create(req.body);
  res
    .status(201)
    .json({ success: true, msg: `user created ${req.params}`, data: dataUser });
};

exports.getUser = (req, res, next) => {
  res.status(200).json({ success: true, msg: `get one user ${req.params.id}` });
};

exports.deletUserfromActivity = (req, res, next) => {
  res.status(200).json({ success: true, msg: `deleted user from activity` });
};

exports.addActivity = (req, res, next) => {
  res.status(200).json({ success: true, msg: "added activity" });
};

exports.getActivity = (req, res, next) => {
  res.status(200).json({ success: true, msg: "get activities" });
};

exports.upActivity = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `updated this activity ${req.params.id}` });
};
