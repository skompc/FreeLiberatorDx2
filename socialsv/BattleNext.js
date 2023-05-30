const fs = require("fs");
const paramTools = require("../tools/paramTools")

function BattleNext(req, res) {
    var input = JSON.stringify(req.query);
    var params = JSON.parse(paramTools.clean(input,0,0));
    var stage = params["stage"]
    var wave = params["wave"];
    let file = fs.readFileSync(`./json/battles/story/${stage}/${wave}.json`, "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { BattleNext };