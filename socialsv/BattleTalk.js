const fs = require("fs");
const jsonTools = require("../tools/jsonTools");
const paramTools = require("../tools/paramTools");
const devilTools = require("../tools/devilTools");

function BattleTalk(req, res) {
    var input = JSON.stringify(req.query);
    var params = JSON.parse(paramTools.clean(input,0,0));
    var tgt = params["tgt"];
    var select = params["select"]

    let devil2TalkTo = devilTools.talkFind(tgt)
    let devilId = devil2TalkTo["id"]

    if (params["select"] == 1){
        // add demon to party
        jsonTools.addTo("./data/players/0/temp/devil_add.json", "devils", devil2TalkTo)
        var devil2add = {
            "param": "0",
            "num": 1,
            "is_bonus": false,
            "id": devilId,
            "type": 1
        }
        jsonTools.addTo("./data/players/0/temp/item.json", "item", devil2add)
    }
    
    let file = fs.readFileSync(`./json/talks/${devilId}/${select}.json`, "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { BattleTalk };