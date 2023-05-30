const fs = require("fs");

function Mission(req, res) {

    let file = fs.readFileSync("./data/players/0/missions.json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { Mission };