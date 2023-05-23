const fs = require("fs");

function TutorialBattleEntry(req, res) {
    let file = fs.readFileSync("./json/tutorial/TutorialBattleEntry.json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { TutorialBattleEntry };