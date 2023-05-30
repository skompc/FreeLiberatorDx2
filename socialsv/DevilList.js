const fs = require("fs");

function DevilList(req, res) {

    let file = fs.readFileSync("./data/players/0/devils.json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { DevilList };