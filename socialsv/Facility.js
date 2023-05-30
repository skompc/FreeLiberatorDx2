const fs = require("fs");

function Facility(req, res) {

    let file = fs.readFileSync("./data/players/0/facility.json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { Facility };