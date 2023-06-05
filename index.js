// Global Variables
const gamePort = 8000;
const assetPort = 3000;
const proxyPort = 8080;

// Requirements
const gameServer = require("./main/gameServer");
const assetServer = require("./main/assetServer");
const proxyServer = require("./main/proxyServer");

gameServer.gameServer(gamePort);
assetServer.assetServer(assetPort);
proxyServer.proxyServer(gamePort, assetPort ,proxyPort);