const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
  },

  slug: {
    type: String,
  },
});

postSchema.pre("save", function (next) {
  this.slug = this.title.toLowerCase().replace(/\s+/g, "-");

  next();
});

const Post = mongoose.model("Post", postSchema);
