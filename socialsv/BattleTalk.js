const fs = require("fs");
const paramTools = require("../tools/paramTools");

function BattleTalk(req, res) {
    var input = JSON.stringify(req.query);
    var params = JSON.parse(paramTools.clean(input,0,0));
    var tgt = params["tgt"];
    var select = params["select"]
    let file = fs.readFileSync(`./json/talks/${tgt}/${select}.json`, "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { BattleTalk };