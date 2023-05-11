// Require express, http, path, and fs
const express = require("express");
const http = require('http');
const path = require('path');
const fs = require("fs");

// Require endpoint files
const { GetUrl } = require("./socialsv/common/GetUrl.do");
const { LoadInfo } = require("./socialsv/LoadInfo.do");
const { Title } = require("./socialsv/Title.do");
const { RegistAccount } = require("./socialsv/RegistAccount.do");

// Asset Server
const server = http.createServer((req, res) => {
    const filePath = path.join(__dirname, req.url);
    const stream = fs.createReadStream(filePath);
  
    stream.on('error', (err) => {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('File not found');
    });
  
    res.writeHead(200, {'Content-Type': 'text/html'});
    stream.pipe(res);
  });
  
  const port = 3000;
  server.listen(port, () => {
    console.log(`Asset Server running on port ${port}`);
  });

// Initialize express
const app = express();
const PORT = 8000;
// parse JSON
app.use(express.json());
// parse URL encoded data
app.use(express.urlencoded({ extended: true }));
// create a server
app.listen(PORT, () => {
console.log(`Game Server running on port ${PORT}`);
});

//endpoints
app.get("/socialsv/common/GetUrl.do", (req, res) => GetUrl(req, res));

app.get("/socialsv/LoadInfo.do", (req, res) => LoadInfo(req, res));

app.get("/socialsv/Title.do", (req, res) => Title(req, res));

app.get("/socialsv/RegistAccount.do", (req, res) => RegistAccount(req, res));
