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
const { GetBaseData } = require("./socialsv/GetBaseData.do");
const { Login } = require("./socialsv/Login.do");
const { Drama } = require("./socialsv/Drama.do");
const { blank } = require("./tools/returnBlank");
const { TutorialUserCreate } = require("./socialsv/TutorialUserCreate.do");
const { TutorialBattleEntry } = require("./socialsv/TutorialBattleEntry.do");
const { TutorialBattleNext } = require("./socialsv/TutorialBattleNext.do");
const { TutorialBattleResult } = require("./socialsv/TutorialBattleResult.do");
const { TutorialMap } = require("./socialsv/TutorialMap.do");

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
app.get("/socialsv/GetBaseData.do", (req, res) => GetBaseData(req, res));
app.get("/socialsv/Login.do", (req, res) => Login(req, res))
app.get("/socialsv/Drama.do", (req, res) => Drama(req, res))
app.get("/socialsv/iap/CpProductList.do", (req, res) => blank(req, res))
app.get("/socialsv/TutorialUserCreate.do", (req, res) => TutorialUserCreate(req, res))
app.get("/socialsv/TutorialBattleEntry.do", (req, res) => TutorialBattleEntry(req, res))
app.get("/socialsv/DramaEnd.do", (req, res) => blank(req, res))
app.get("/socialsv/TutorialBattleNext.do", (req, res) => TutorialBattleNext(req, res))
app.post("/socialsv/TutorialBattleResult.do", (req, res) => TutorialBattleResult(req, res))
app.get("/socialsv/TutorialMap.do", (req, res) => TutorialMap(req, res))
