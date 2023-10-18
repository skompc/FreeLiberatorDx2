const fs = require("fs");
const decrypt = require("../tools/decrypt")
const questTools = require("../tools/questTools")
const devilTools = require("../tools/devilTools")
const jsonTools = require("../tools/jsonTools")

function BattleResult(req, res) {
    let params = decrypt.stringToJsonObject(decrypt.decrypt(req.body.param));

    let resultFile = JSON.parse(fs.readFileSync(`./json/battles/story/${params.stage}/result.json`, "utf8"));
    let drama = resultFile.drama;
    let expGained = resultFile.exp;
    console.log(expGained)
    let get_mag = resultFile.mag;
    let get_money = resultFile.money;
    let first_prize = resultFile.first_prize;

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



    let reward = RewardBuilder(get_mag, 0, get_money, usr.mc, items, dvl_before, dvl, dvl_lv, smn, smn_before, smn_skill_ids )

    let response = {
        "consume_ap": 0,
        "bonus_evt_item": 0,
        "is_magatama_max": false,
        "client_wait": 0,
        "is_read": false,
        "drama": drama,
        "bonus_exp": 0,
        "bonus_player_exp": 0,
        "is_card_max": false,
        "is_again": false,
        "is_advice_usable": false,
        "is_first": true,
        "bonus_gold": 0,
        "res_code": 0,
        "clear_tm": 146000,
        "best_tm": 0,
        "is_best_record": true,
        "is_magatama_sell": false,
        "first_prize": first_prize,
        "usr": usr,
        "reward": reward
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

function RewardBuilder(get_mag, curr_mag, get_money, curr_money, item, dvl_before, dvl, dvl_lv, smn, smn_before, smn_skill_ids){
    let json2Return = {
        "get_mag": get_mag,
        "curr_mag": curr_mag,
        "magatama_rate": 1,
        "get_money": get_money,
        "curr_money": curr_money,
        "item": item,
        "item_tag": [],
        "dvl_before": dvl_before,
        "dvl": dvl,
        "dvl_lv": dvl_lv,
        "smn": smn,
        "smn_before": smn_before,
        "smn_lv": [],
        "smn_skill_ids": smn_skill_ids
    }

return json2Return;

}


module.exports = { BattleResult };