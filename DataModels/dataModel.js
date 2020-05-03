const mongoose = require("mongoose");

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
    unique: true,
    trim: true,
    required: false,
  },
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
      start: Date,
      end: Date,
      notes: String,
      images: String,
      milestones: [{ notes: String, date: Date }],
      required: false,
    },
  ],
});

const userModel = mongoose.model("userModel", UserSchema);
const challengesModel = mongoose.model("challengesModel", ChallengesSchema);

module.exports = { userModel, challengesModel };
