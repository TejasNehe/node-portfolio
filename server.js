
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath = "";

  if (req.url === "/") {
    filePath = path.join(__dirname, "pages", "index.html");
  } else {
    filePath = path.join(__dirname, req.url);
  }

  const extname = path.extname(filePath);

  let contentType = "text/html";

  switch (extname) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".pdf":
      contentType = "application/pdf";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 - File Not Found</h1>");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
}).listen(3000);

