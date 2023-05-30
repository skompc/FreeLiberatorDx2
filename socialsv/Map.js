const fs = require("fs");

function MapFunc(req, res) {

    let file = fs.readFileSync("./data/players/0/map.json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { MapFunc };