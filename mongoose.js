require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/chapter4/mongoose/models/User");

// console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI);

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

async function run() {
  // const user = await User.create({
  //   name: "John Doe",
  //   email: "johnrr@example.com",
  // });
  // user.email = "jane@example.com";
  // user.save();
  try {
    // const user = await User.findByIdAndUpdate(
    //   "6aa7a01bf2e6a10b074c3f95",
    //   {
    //     age: 30,
    //   },
    //   { returnDocument: "after" },
    // );
    //const users = await User.find({ age: { $gt: 18 } });
    // const user = await User.create({
    //   name: "vivan rohn",
    //   email: "vivan@example.com",
    //   age: 25,
    //   skills: ["JavaScript", "Python"],
    //   role: "user",
    // });
    const user = await User.find({ age: { $gt: 18 } }).limit(1);
    // await user[0].populate("bestFriend");
    await user[0].skills.push("Node.js", "React");
    // user[0].bestFriend = "6aa7b5ba1e3493dc6a36df28"; // Replace with the actual ObjectId of the best friend
    // await user[0].save();
    console.log(user);
  } catch (error) {
    console.error("Error creating user:", error);
  }
}

run();
