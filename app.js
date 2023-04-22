// node express way of doing things

const express = require("express");

//express app
const app = express();

// listen for requests
app.listen(3000);

// routing
app.get("/", (req, res) => {
  //   res.send("<p>some info</p>");
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  //   res.send("<p>some info on about page</p>");
  res.sendFile("./views/about.html", { root: __dirname });
});

// to redirect
app.get("/about-it", (req, res) => {
  res.redirect("/about");
});

/// 404 page
app.use((req, res) => {
  res.sendFile("./views/404.html", { root: __dirname });
});
