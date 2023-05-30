// Require express, http, path, and fs
const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");

const serverPort = 8000;
const assetPort = 3000;

// Require endpoint files
const { GetUrl } = require("./socialsv/common/GetUrl");
const { LoadInfo } = require("./socialsv/LoadInfo");
const { Title } = require("./socialsv/Title");
const { RegistAccount } = require("./socialsv/RegistAccount");
const { GetBaseData } = require("./socialsv/GetBaseData");
const { Login } = require("./socialsv/Login");
const { Drama } = require("./socialsv/Drama");
const { blank } = require("./tools/returnBlank");
const { TutorialUserCreate } = require("./socialsv/TutorialUserCreate");
const { TutorialBattleEntry } = require("./socialsv/TutorialBattleEntry");
const { TutorialBattleNext } = require("./socialsv/TutorialBattleNext");
const { TutorialBattleResult } = require("./socialsv/TutorialBattleResult");
const { TutorialMap } = require("./socialsv/TutorialMap");
const { TutorialFacility } = require("./socialsv/TutorialFacility");
const { TutorialSociety } = require("./socialsv/TutorialSociety");
const { Mission } = require("./socialsv/Mission");
const { MapFunc } = require("./socialsv/Map");
const { Facility } = require("./socialsv/Facility");
const { Society } = require("./socialsv/Society");
const { TutorialFinish } = require("./socialsv/TutorialFinish");

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
  
  server.listen(assetPort, () => {
    console.log(`Asset Server running on port ${assetPort}`);
  });

// Game Server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(serverPort, () => {
console.log(`Game Server running on port ${serverPort}`);
});

//endpoints
app.get("/socialsv/common/GetUrl.do", (req, res) => GetUrl(req, res));
app.get("/socialsv/LoadInfo.do", (req, res) => LoadInfo(req, res));
app.get("/socialsv/Title.do", (req, res) => Title(req, res));
app.get("/socialsv/RegistAccount.do", (req, res) => RegistAccount(req, res));
app.get("/socialsv/GetBaseData.do", (req, res) => GetBaseData(req, res));
app.get("/socialsv/Login.do", (req, res) => Login(req, res));
app.get("/socialsv/Drama.do", (req, res) => Drama(req, res));
app.get("/socialsv/iap/CpProductList.do", (req, res) => blank(req, res));
app.get("/socialsv/TutorialUserCreate.do", (req, res) => TutorialUserCreate(req, res));
app.get("/socialsv/TutorialBattleEntry.do", (req, res) => TutorialBattleEntry(req, res));
app.get("/socialsv/DramaEnd.do", (req, res) => blank(req, res));
app.get("/socialsv/TutorialBattleNext.do", (req, res) => TutorialBattleNext(req, res));
app.post("/socialsv/TutorialBattleResult.do", (req, res) => TutorialBattleResult(req, res));
app.get("/socialsv/TutorialMap.do", (req, res) => TutorialMap(req, res));
app.get("/socialsv/TutorialFacility.do", (req, res) => TutorialFacility(req, res));
app.get("/socialsv/TutorialSociety.do", (req, res) => TutorialSociety(req, res));
app.get("/socialsv/Mission.do", (req, res) => Mission(req, res));
app.get("/socialsv/Map.do", (req, res) => MapFunc(req, res));
app.get("/socialsv/Facility.do", (req, res) => Facility(req, res));
app.get("/socialsv/Society.do", (req, res) => Society(req, res));
app.get("/socialsv/TutorialFinish.do", (req, res) => TutorialFinish(req, res));