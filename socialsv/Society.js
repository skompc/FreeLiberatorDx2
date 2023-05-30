const fs = require("fs");

function Society(req, res) {

    let file = fs.readFileSync("./data/players/0/society.json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { Society };