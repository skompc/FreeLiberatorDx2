const fs = require("fs");
const decrypt = require("../tools/decrypt")

function TutorialBattleNext(req, res) {
    let params = decrypt.stringToJsonObject(decrypt.decrypt(req.query.param));

    var wave = params.wave;
    let file = fs.readFileSync("./json/battles/tutorial/" + wave +".json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { TutorialBattleNext };