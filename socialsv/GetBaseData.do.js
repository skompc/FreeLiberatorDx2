const fs = require("fs");
const paramTools = require("../tools/paramTools");

function GetBaseData(req, res) {
    var param = JSON.stringify(req.query);
    var query = paramTools.clean(param);
    var data2Get = query.type;

    let file = fs.readFileSync("./json/base/basedata/" + data2Get +".json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { GetBaseData };