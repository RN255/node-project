// node express way of doing things

const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

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
app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "blog2",
    body: "this is the content",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// display blogs
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// display single blog
app.get("/single-blog", (req, res) => {
  Blog.findById("6446d2d98e515bb61b0b720f")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//make static files public - eg. css files
app.use(express.static("public"));

// middleware to convert post request into object
app.use(express.urlencoded({ extended: true }));

// routing
app.get("/", (req, res) => {
  //   res.send("<p>some info</p>");
  // res.sendFile("./views/index.html", { root: __dirname }); // this was used before ejs
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //   res.send("<p>some info on about page</p>");
  // res.sendFile("./views/about.html", { root: __dirname }); // this was used before ejs
  res.render("about");
});

//blog routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("index", { blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//post a newly created blog
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body); //'body' is the object from above

  blog
    .save()
    .then((result) => {
      res.redirect("./blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// get details of a single blog
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
      console.log("I ran");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/create", (req, res) => {
  //   res.send("<p>some info on about page</p>");
  // res.sendFile("./views/about.html", { root: __dirname }); // this was used before ejs
  res.render("create");
});

// to redirect
app.get("/about-it", (req, res) => {
  res.redirect("/about");
});

/// 404 page
app.use((req, res) => {
  // res.sendFile("./views/404.html", { root: __dirname }); // this was used before ejs
  res.render("404");
});
