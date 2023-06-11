const fs = require("fs");
const paramTools = require("../tools/paramTools")
const questTools = require("../tools/questTools")
const devilTools = require("../tools/devilTools")
const jsonTools = require("../tools/jsonTools")

function BattleResult(req, res) {
    var input = JSON.stringify(req.body);
    var uri = paramTools.uriFormatter(JSON.parse(input))
    var uri2 = paramTools.clean(uri, 1, 5)
    var params = paramTools.toJSON(uri2)

    let file = fs.readFileSync(`./json/battles/story/${params["stage"]}/result.json`, "utf8");

    let usr = JSON.parse(fs.readFileSync("./data/players/0/usr.json", "utf8")).usr

    const expArray = JSON.parse(fs.readFileSync("./json/common/exp_next.json", "utf8")).exp_next;

    var exp = JSON.parse(file).exp2Grant
    console.log(exp)

    let dvl_before_file = [
        "./data/players/0/temp/dvl_before.json"
    ]
    let dvl_before = jsonTools.combine(dvl_before_file).dvl_before

    let dvl_lv = dvl_before.map(obj => {
        let val2Return =  { 
            exp_pre: obj.exp,
            level: obj.lv,
            id: obj.uniq,
            exp_new: obj.exp + exp,
            exp_next: [
                expArray[obj.lv - 1],
                expArray[obj.lv],
                expArray[obj.lv + 1]
            ]
        };
        devilTools.devilLevel(obj.uniq, exp);
        return val2Return;
    });
    let dvl = JSON.parse(fs.readFileSync("./data/players/0/devils.json", "utf8"))["devils"]

    let smn_before_file = [
        "./data/players/0/temp/smn_before.json"
    ]
    let smn_before = jsonTools.combine(smn_before_file).smn_before

    let smn_lv = smn_before.map(obj => {
        let val2Return =  { 
            exp_pre: obj.exp,
            level: obj.level,
            id: obj.id,
            exp_new: obj.exp + exp,
            exp_next: [
                expArray[obj.level - 1],
                expArray[obj.level],
                expArray[obj.level + 1]
            ]
        };
        devilTools.summonerLevel(obj.id, exp)
        return val2Return;
    });
    let smn = JSON.parse(fs.readFileSync("./data/players/0/party.json", "utf8"))["summoners"]

    let result = params["result"]
    if (result == 1){
        questTools.updateQuests(parseInt(params["stage"]))
    } else if (result == 0) {
        // Return failure
    } else if (result == 2){
        // Return escape
    }
    res.status(200).json(JSON.parse(file))
}


module.exports = { BattleResult };