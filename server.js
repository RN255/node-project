const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log("request made");

  res.setHeader("Content-Type", "text/html");

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me": //redirect from about-me to about
      res.statusCode = 301;
      res.setHeader("location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 400;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.write(data); //you can also use 'res.end(data)' only and omit write
      res.end();
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});
