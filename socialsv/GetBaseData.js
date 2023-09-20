const fs = require("fs");
const decrypt = require("../tools/decrypt");

function GetBaseData(req, res) {
    let params = decrypt.stringToJsonObject(decrypt.decrypt(req.query.param));

    var data2Get = params.type;
    let file = fs.readFileSync("./json/common/basedata/" + data2Get +".json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { GetBaseData };