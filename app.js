// node express way of doing things

const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

//express app
const app = express();

// mongobd info
const dbURI =
  "mongodb+srv://userone:ol2S7pY6GQyAAIpD@cluster0.jqog4pb.mongodb.net/blogs";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000)) //connect to 3000 after database connection
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware example
// third party middlewate available
app.use((req, res, next) => {
  console.log("this prints to terminal");
  next(); //moves on to next item
});

// mongoose and mongo sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Comment({
//     title: "blog2",
//     body: "this is the content",
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// to redirect
app.get("/about-it", (req, res) => {
  res.redirect("/about");
});

// blog routes
app.use(blogRoutes);

/// 404 page
app.use((req, res) => {
  // res.sendFile("./views/404.html", { root: __dirname }); // this was used before ejs
  res.render("404");
});

// make the public file public so images can be accessed
app.use(express.static(__dirname + "/public"));



