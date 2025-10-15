// server.js
const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5101;

// SSL ke liye certificates (agar tumhe HTTPS chahiye)
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem")
};

// Static files serve karne ke liye
app.use(express.static(path.join(__dirname)));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Server start karo
https.createServer(options, app).listen(port, () => {
  console.log(`✅ Server running at https://localhost:${port}`);
});
