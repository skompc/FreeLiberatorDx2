const fs = require("fs");

function TutorialSociety(req, res) {
    let file = fs.readFileSync("./json/tutorial/society.json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { TutorialSociety };