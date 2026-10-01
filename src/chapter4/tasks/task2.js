require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./src/chapter4/mongoose/models/User");

// console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // CREATE
    const post = await Post.create({
      title: "My First Post",
      content: "This is my first blog post.",
      author: "John Doe",
      rating: 4,
    });

    console.log("Created:", post);

    // FIND BY ID
    const foundPost = await Post.findById(post._id);
    console.log("Found:", foundPost);

    // UPDATE
    const updatedPost = await Post.findByIdAndUpdate(
      post._id,
      {
        title: "Updated Post",
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    console.log("Updated:", updatedPost);

    // DELETE
    const deletedPost = await Post.findByIdAndDelete(post._id);
    console.log("Deleted:", deletedPost);

    //TASK 4G testing
    // const post = await Post.create({
    //   title: "Hello World",
    //   content: "My first post"
    // });

    // console.log(post);
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.disconnect();
  }
}

run();
