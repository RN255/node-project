const Comment = require("../models/blog");

const blog_index = (req, res) => {
  Comment.find()
    .sort({ createdAt: -1 })
    .then((result) => {
        res.render('index', {comments: result})
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  Comment.findById(id)
    .then((result) => {
      res.render("details", { comment: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_create_get = (req, res) => {
  res.render("create");
};

const blog_create_post = (req, res) => {
  const comment = new Comment(req.body); //'body' is the object from above

  comment
    .save()
    .then((result) => {
      res.redirect("./blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;

  Comment.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
      console.log("I ran");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
