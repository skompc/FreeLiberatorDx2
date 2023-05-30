const fs = require("fs");

function TutorialBattleNext(req, res) {
    var X = JSON.stringify(req.query);
    var Y = 'wave=';
    var Z = X.slice(X.indexOf(Y) + Y.length);
    var data2Get = parseInt(Z.substring(0));

    let file = fs.readFileSync("./json/battles/tutorial/" + data2Get +".json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { TutorialBattleNext };