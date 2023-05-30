const fs = require("fs");
const tools = require("../tools/jsonTools");

function Party(req, res) {

    let file = fs.readFileSync("./data/players/0/party.json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { Party };