const fs = require("fs");

function TutorialBattleResult(req, res) {
    let file = fs.readFileSync("./json/battles/tutorial/result.json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { TutorialBattleResult };