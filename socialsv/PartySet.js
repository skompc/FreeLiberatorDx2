const fs = require("fs");
const tools = require("../tools/jsonTools");
const devilTools = require("../tools/devilTools")
const decrypt = require("../tools/decrypt");

function PartySet(req, res) {
    let params = decrypt.stringToJsonObject(decrypt.decrypt(req.query.param));

    let summoner = params.summoner;
    let party = params.party;
    let pos = params.pos;
    let devil = params.devil;
    let is_set = params.is_set;

    if (is_set == 0){
        devilTools.add2Party(summoner, party, pos, 0)
    } else {
        devilTools.add2Party(summoner, party, pos, devil)
    }

    let data = JSON.parse(fs.readFileSync("./data/players/0/party.json"))
    res.status(200).json(data);
}

module.exports = { PartySet };