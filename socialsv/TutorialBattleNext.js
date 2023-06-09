const fs = require("fs");
const paramTools = require("../tools/paramTools")

function TutorialBattleNext(req, res) {
    var input = JSON.stringify(req.query);
    var params = JSON.parse(paramTools.clean(input,0,0));
    var data2Get = params["wave"];
    let file = fs.readFileSync("./json/battles/tutorial/" + data2Get +".json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { TutorialBattleNext };