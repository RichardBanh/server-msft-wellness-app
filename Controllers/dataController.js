const { userModel, challengesModel } = require("../DataModels/dataModel");

exports.createUser = async (req, res, next) => {
  try {
    const dataUser = await userModel.create(req.body);
    sendTokenByCookie(dataUser, 200, res, "user created!");
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
  console.log(req.body.user);
  try {
    const upUser = await userModel.findOneAndUpdate(req.body.user, {
      $addToSet: req.body.upWhat,
    });
    res.status(201).json({
      sucess: true,
      msg: `updating ${req.body.user.user}`,
      dataUpdate: upUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, whathappened: error });
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const dataUser = await userModel.findOne({ email }).select("+password");
    const doesPasswordMatch = await dataUser.matchPassword(password);
    if (!email || !password) {
      res
        .status(400)
        .json({ sucess: false, whathappened: "no email or password" });
    } else if (!dataUser) {
      res
        .status(400)
        .json({ sucess: false, whathappened: "invalid credentials" });
    } else if (!doesPasswordMatch) {
      res
        .status(400)
        .json({ sucess: false, whathappened: "invalid credentials" });
    } else {
      sendTokenByCookie(dataUser, 200, res, "user logged in!");
    }
  } catch (error) {
    res.status(400).json({ success: false, whathappened: error });
  }
};
//Get token from model
const sendTokenByCookie = (dataUser, status, res, message) => {
  const token = dataUser.getSignedJWT();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 25 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res
    .status(status)
    .cookie("token", token, options)
    .json({ success: true, token, message });
};

exports.logout = async (req, res, next) => {
  res.cookie(
    "token",
    "none",
    { expires: new Date(Date.now() + 10) },
    { httpOnly: true }
  );
  res.status(200).json({ message: "logged out" });
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
