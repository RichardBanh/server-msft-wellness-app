const { userModel, challengesModel } = require("../DataModels/dataModel");

exports.createUser = async (req, res, next) => {
  try {
    const dataUser = await userModel.create(req.body);
    res.status(201).json({
      success: true,
      msg: `user created`,
      data: dataUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, whathappened: error });
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const dataUser = await userModel.find(req.body);
    if (req.body.user === undefined || req.body === undefined) {
      res.status(405).json({
        success: false,
        msg: `No body or no username sent`,
      });
    } else if (dataUser.length === 0) {
      res.status(403).json({
        success: false,
        msg: `get single user ${req.body.user}: NOT FOUND`,
      });
    } else {
      res.status(201).json({
        success: true,
        msg: `get single user ${req.body.user}`,
        data: dataUser,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, whathappened: error });
  }
};

exports.upUser = async (req, res, next) => {
  try {
    const upUser = await userModel.findOneAndUpdate(req.body.user, {
      $addToSet: req.body.upWhat,
    });
    res.status(201).json({
      sucess: true,
      msg: `updating ${req.body.user}`,
      dataUpdate: upUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, whathappened: error });
  }
};

exports.deletUserfromActivity = async (req, res, next) => {
  try {
    const userData = await userModel.findOneAndUpdate(
      {
        user: req.body.user,
        ActiveChallenges: { $in: req.body.challenge },
      },
      { $pullAll: { ActiveChallenges: [req.body.challenge] } },
      { new: true }
    );
    const challengesData = await challengesModel.findOneAndUpdate(
      {
        name: req.body.challenge,
        //HOW TO SEARCH PARTICIPANTS ASWELL?
        // participants: { user: req.body.user  },
      },
      { $pull: { participants: { user: req.body.user } } },
      { new: true }
    );
    res
      .status(201)
      .json({ success: true, challenge: challengesData, user: userData });
  } catch (error) {
    res.status(400).json({ success: false, whathappened: error });
  }
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

exports.getActivity = async (req, res, next) => {
  try {
    const dataActivity = await challengesModel.find(req.body);
    res.status(201).json({
      success: true,
      msg: `activity found ${req.params}`,
      data: dataActivity,
    });
  } catch (error) {
    res.status(400).json({ success: false, whathappened: error });
  }
};

exports.upActivity = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `updated this activity ${req.params.id}` });
};

//could also add error handler and (async to remove catch)
