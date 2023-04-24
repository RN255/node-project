const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  { collection: "blogs" } //creates collection if not already there
);

const Blog = mongoose.model("blog", blogSchema); //use singular of collection
module.exports = Blog;
