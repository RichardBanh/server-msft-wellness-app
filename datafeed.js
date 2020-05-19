const fs = require("fs");
const dotenv = require("dotenv");
const { userModel, challengesModel } = require("./DataModels/dataModel");
dotenv.config({ path: "./Config/config.env" });
const connectData = require("./Config/db");
const challengesData = JSON.parse(
  fs.readFileSync("./Data/challenges.json", "utf-8")
);
const userData = JSON.parse(fs.readFileSync("./Data/user.json", "utf-8"));
connectData();

const importUserData = async () => {
  try {
    await userModel.create(userData);
    console.log("User data imported");
    process.exit();
  } catch (error) {
    console.log(userData);
  }
};

const importChallengesData = async () => {
  try {
    await challengesModel.create(challengesData);
    console.log("Challenges Data Imported");
    process.exit();
  } catch (error) {
    console.log(challengesData);
  }
};

const deleteChallengesData = async () => {
  try {
    await challengesModel.deleteMany();
    console.log("Challenges Data DELETED");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteUserData = async () => {
  try {
    await userModel.deleteMany();
    console.log("User Data DELETED");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[3] === "-delete" && process.argv[2] === "-user") {
  deleteUserData();
} else if (process.argv[3] === "-delete" && process.argv[2] === "-challenges") {
  deleteChallengesData();
} else if (process.argv[3] === "-import" && process.argv[2] === "-user") {
  importUserData();
} else if (process.argv[3] === "-import" && process.argv[2] === "-challenges") {
  importChallengesData();
}

// node datafeed.js -challenges -import
