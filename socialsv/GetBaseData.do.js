const fs = require("fs");
const paramTools = require("../tools/paramTools");

function GetBaseData(req, res) {
    var input = JSON.stringify(req.query);
    var params = paramTools.clean(input,0,0);
    var data2Get = params.type;

    let file = fs.readFileSync("./json/base/basedata/" + data2Get +".json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { GetBaseData };