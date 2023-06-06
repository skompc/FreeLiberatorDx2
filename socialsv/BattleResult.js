const fs = require("fs");
const paramTools = require("../tools/paramTools")

function BattleResult(req, res) {
    var input = JSON.stringify(req.query);
    var params = JSON.parse(paramTools.clean(input,1,5));
    console.log(JSON.stringify(params))

    res.status(404);
}

module.exports = { BattleResult };