const fs = require("fs");
const tools = require("../tools/jsonTools")
const decrypt = require("../tools/decrypt")

function BattleNext(req, res) {
    let params = decrypt.stringToJsonObject(decrypt.decrypt(req.query.param));
    var stage = params.stage;
    var wave = params.wave;

    let file = fs.readFileSync(`./json/battles/story/${stage}/${wave}.json`, "utf8");
    let data = JSON.parse(file)

    fs.writeFileSync("./data/players/0/temp/battle.json", "{}")
    tools.addTo("./data/players/0/temp/battle.json", "enemies", data["enemies"]);
    
    res.status(200).json(data);
}

module.exports = { BattleNext };