const fs = require("fs");
const paramTools = require("../tools/paramTools")
const questTools = require("../tools/questTools")

function BattleResult(req, res) {
    var input = JSON.stringify(req.body);
    console.log(input)
    console.log()
    var uri = paramTools.uriFormatter(JSON.parse(input))
    console.log(uri)
    console.log()
    var uri2 = paramTools.clean(uri, 1, 5)
    console.log(uri2)
    console.log()
    var params = paramTools.toJSON(uri2)
    console.log(params["an_info"])

    let result = params["result"]
    if (result = 1){
        questTools.updateQuests(parseInt(params["stage"]))
    } else {
        // Return failure
    }

    let file = fs.readFileSync(`./json/battles/story/${params["stage"]}/result.json`, "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { BattleResult };