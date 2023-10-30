const fs = require("fs");
const decrypt = require("../tools/decrypt")
const questTools = require("../tools/questTools")
const devilTools = require("../tools/devilTools")
const jsonTools = require("../tools/jsonTools")

function BattleResult(req, res) {
    let params = decrypt.stringToJsonObject(decrypt.decrypt(req.body.param));

    let resultFile = JSON.parse(fs.readFileSync(`./json/battles/story/${params.stage}/result.json`, "utf8"));
    let expGained = resultFile.exp;

    let expArray = JSON.parse(fs.readFileSync("./json/common/exp_next.json")).exp_next;

    let result = params.result;

    let dvl_before = JSON.parse(fs.readFileSync("./data/players/0/temp/dvl_before.json")).dvl_before;
    let smn_before = JSON.parse(fs.readFileSync("./data/players/0/temp/smn_before.json")).smn_before;
    let items = JSON.parse(fs.readFileSync("./data/players/0/temp/item.json")).items;
    let usr = JSON.parse(fs.readFileSync("./data/players/0/usr.json")).usr;

    let smn = JSON.parse(fs.readFileSync("./data/players/0/party.json")).summoners;
    let smn_skill_ids = smn.skl;
    let dvl = []
    let dvl_lv = []

    for (let i = 0; i < dvl_before.length; i++) {
        console.log("devil " + i)
        let obj = dvl_before[i];
        let level = obj.lv;
        let exp_pre = obj.exp;
        let id = obj.uniq;
        let exp_next = [expArray[level - 1]];

        dvl2Level = devilTools.devilLevel(obj.uniq, expGained);
        dvl2Add = devilTools.devilSearch(obj.uniq);
        dvl.push(dvl2Add);

        let exp_new = dvl2Add.exp;
        let lv_new = dvl2Add.lv;

        for (let j = level; j < lv_new; j++) {
            exp_next.push(expArray[level])
            console.log("devil " + i + "has leveled up to lvl " + j)
        }

        let dvl_lv2Add = 
        {
            "exp_pre": exp_pre,
            "level": level,
            "exp_next": exp_next,
            "id": id,
            "exp_new": exp_new
        }

        dvl_lv.push(dvl_lv2Add);
    }

    if (result == 1){
        questTools.updateQuests(parseInt(params.stage))
    } else if (result == 0) {
        // Return failure
    } else if (result == 2){
        // Return escape
    }
    res.status(200).json(resultFile)
}


module.exports = { BattleResult };