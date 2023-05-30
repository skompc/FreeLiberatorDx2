const fs = require("fs");

function TutorialBattleEntry(req, res) {
    let file = fs.readFileSync("./json/battles/tutorial/0.json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { TutorialBattleEntry };