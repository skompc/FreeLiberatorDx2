const fs = require("fs");
const decrypt = require("../tools/decrypt")

function Drama(req, res) {
    let params = decrypt.stringToJsonObject(decrypt.decrypt(req.query.param));
    var path = decodeURIComponent(params.path);

    let file = fs.readFileSync("./json/dramas/" + path +".json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { Drama };