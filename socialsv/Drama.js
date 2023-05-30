const fs = require("fs");

function Drama(req, res) {
    var data2Get = req.query.path;

    let file = fs.readFileSync("./json/dramas/" + data2Get +".json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { Drama };