const { isNumber } = require("lodash");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    Hearts: {
      type: Number,
      default: 0,
    },
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
  { collection: "comments" } //creates collection if not already there
);

const Comment = mongoose.model("comment", commentSchema); //use singular of collection
module.exports = Comment;
