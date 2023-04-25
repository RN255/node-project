const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

// display blogs
router.get("/all-blogs", blogController.blog_index);

// display single blog
// router.get("/single-blog", (req, res) => {
//   Blog.findById("6446d2d98e515bb61b0b720f")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//make static files public - eg. css files
router.use(express.static("public"));

// middleware to convert post request into object
router.use(express.urlencoded({ extended: true }));

// routing
// router.get("/", (req, res) => {
//   //   res.send("<p>some info</p>");
//   // res.sendFile("./views/index.html", { root: __dirname }); // this was used before ejs
//   res.redirect("/blogs");
// });

router.get("/about", (req, res) => {
  //   res.send("<p>some info on about page</p>");
  // res.sendFile("./views/about.html", { root: __dirname }); // this was used before ejs
  res.render("about");
});

//blog routes
// router.get("/blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.render("index", { blogs: result });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//post a newly created blog
router.get("/blogs", blogController.blog_index);

router.post("/blogs", blogController.blog_create_post);

router.get("/create", blogController.blog_create_get);

// get details of a single blog
router.get("/blogs/:id", blogController.blog_details);

router.delete("/blogs/:id", blogController.blog_delete);

module.exports = router;
