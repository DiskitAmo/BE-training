const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
    validate: {
      // Custom validator for username length
      validator: function (value) {
        return value.length >= 5;
      },
      message: "Username must be at least 5 characters",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  skills: {
    type: [String],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
  },
  bestFriend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre("save", function (next) {
  console.log("About to save user");

  //next();
});

userSchema.post("save", function (doc) {
  console.log(`User ${doc.name} was created`);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
