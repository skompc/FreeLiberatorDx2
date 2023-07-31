//Global Variables
const gamePort = 8000;

function gameServer(gamePort){

    // Require express, http, path, and fs, and others
    const express = require("express");
    const http = require("http");
    const path = require("path");
    const fs = require("fs");
    const tools = require("../tools/otherTools")
    const { blank } = tools.blank();

    // Require endpoint files
    const { GetUrl } = require("../socialsv/common/GetUrl");
    const { LoadInfo } = require("../socialsv/LoadInfo");
    const { Title } = require("../socialsv/Title");
    const { RegistAccount } = require("../socialsv/RegistAccount");
    const { GetBaseData } = require("../socialsv/GetBaseData");
    const { Login } = require("../socialsv/Login");
    const { Drama } = require("../socialsv/Drama");
    const { TutorialUserCreate } = require("../socialsv/TutorialUserCreate");
    const { TutorialBattleEntry } = require("../socialsv/TutorialBattleEntry");
    const { TutorialBattleNext } = require("../socialsv/TutorialBattleNext");
    const { TutorialBattleResult } = require("../socialsv/TutorialBattleResult");
    const { TutorialMap } = require("../socialsv/TutorialMap");
    const { TutorialFacility } = require("../socialsv/TutorialFacility");
    const { TutorialSociety } = require("../socialsv/TutorialSociety");
    const { Mission } = require("../socialsv/Mission");
    const { MapFunc } = require("../socialsv/Map");
    const { Facility } = require("../socialsv/Facility");
    const { Society } = require("../socialsv/Society");
    const { TutorialFinish } = require("../socialsv/TutorialFinish");
    const { Home } = require("../socialsv/Home");
    const { Party } = require("../socialsv/Party");
    const { PartySet } = require("../socialsv/PartySet");
    const { DramaQuest } = require("../socialsv/DramaQuest");
    const { DramaEnd } = require("../socialsv/DramaEnd");
    const { BattleEntry } = require("../socialsv/BattleEntry");
    const { Helper } = require("../socialsv/Helper");
    const { DevilList } = require("../socialsv/DevilList");
    const { SummonerSkillLearn } = require("../socialsv/SummonerSkillLearn");
    const { BattleTalk } = require("../socialsv/BattleTalk");
    const { BattleNext } = require("../socialsv/BattleNext");
    const { BattleResult } = require("../socialsv/BattleResult");
    const { IngameTutorialCheck } = require("../socialsv/IngameTutorialCheck");
    const { IngameTutorialEnd } = require("../socialsv/IngameTutorialEnd");

    // Game Server
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.listen(gamePort, () => {
        console.log(`Game Server running on port ${gamePort}`);
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
    app.get("/socialsv/DramaEnd.do", (req, res) => DramaEnd(req, res));
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
    app.get("/socialsv/Home.do", (req, res) => Home(req, res));
    app.get("/socialsv/Notification.do", (req, res) => blank(req, res));
    app.get("/socialsv/DramaQuest.do", (req, res) => DramaQuest(req, res));
    app.get("/socialsv/Party.do", (req, res) => Party(req, res));
    app.get("/socialsv/BattleEntry.do", (req, res) => BattleEntry(req, res));
    app.get("/socialsv/IngameTutorialCheck.do", (req, res) => IngameTutorialCheck(req, res));
    app.get("/socialsv/Helper.do", (req, res) => Helper(req, res));
    app.get("/socialsv/DevilList.do", (req, res) => DevilList(req, res));
    app.post("/socialsv/DevilWatch.do", (req, res) => blank(req, res));
    app.get("/socialsv/SummonerSkillLearn.do", (req, res) => SummonerSkillLearn(req, res));
    app.get("/socialsv/BattleTalk.do", (req, res) => BattleTalk(req, res));
    app.get("/socialsv/BattleNext.do", (req, res) => BattleNext(req, res));
    app.post("/socialsv/BattleResult.do", (req, res) => BattleResult(req, res))
    app.get("/socialsv/IngameTutorialEnd.do", (req, res) => IngameTutorialEnd(req, res));
    app.get("/socialsv/PartySet.do", (req, res) => PartySet(req, res));

}

gameServer(gamePort)
module.exports = { gameServer };