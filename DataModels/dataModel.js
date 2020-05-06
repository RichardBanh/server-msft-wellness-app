const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "Please add Username"],
    unique: true,
    trim: true,
    maxlength: [20, "No longer than 20 characters"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: { type: String, required: true },
  imageLocation: {
    type: String,
    required: [false],
  },
  ActiveChallenges: {
    type: [String],
    required: [false],
  },
  Rewards: {
    type: [String],
    required: [false],
  },
  PastChallenges: [
    {
      Name: String,
      Date: { Start: Date, End: Date },
    },
  ],
});

const ChallengesSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  ACTIVE: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  BannerImg: {
    type: String,
    required: false,
  },
  category: {
    type: [String],
    required: true,
  },
  participants: [
    {
      user: String,
      progress: String,
      Date: { Start: Date, End: Date },
      notes: String,
      images: String,
      milestones: [{ notes: String, date: Date }],
      required: false,
    },
  ],
});

/// why arrow function does not work here?

UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// Sign JWT
UserSchema.methods.getSignedJWT = function (params) {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE})
}
//match password to hash
UserSchema.methods.matchPassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password)
}

//To run something presave schema.pre('save', async function(next)
//{next(await)})  ... video 31
const userModel = mongoose.model("userModel", UserSchema);
const challengesModel = mongoose.model("challengesModel", ChallengesSchema);

module.exports = { userModel, challengesModel };
