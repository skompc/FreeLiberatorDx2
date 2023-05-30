const fs = require("fs");

function TutorialMap(req, res) {

    let file = fs.readFileSync("./json/tutorial/Map.json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { TutorialMap };