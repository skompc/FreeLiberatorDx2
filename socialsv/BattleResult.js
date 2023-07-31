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

    let resultFile = JSON.parse(fs.readFileSync(`./json/battles/story/${params["stage"]}/result.json`, "utf8"));
    let stage = resultFile.drama

    let result = params["result"]
    if (result == 1){
        questTools.updateQuests(parseInt(params["stage"]))
    } else if (result == 0) {
        // Return failure
    } else if (result == 2){
        // Return escape
    }
    res.status(200).json(RewardBuilder(stage))
}

function RewardBuilder(stage){

    let tempfiles = [
        "./data/players/0/temp/dvl_before.json",
        "./data/players/0/temp/item.json",
        "./data/players/0/temp/smn_before.json",
        "./data/players/0/usr.json"
    ]

    let dvl_before = jsonTools.combine(tempfiles).dvl_before
    let smn_before = jsonTools.combine(tempfiles).smn_before
    let items = jsonTools.combine(tempfiles).item
    let usr = jsonTools.combine(tempfiles).usr
    let usr_id = jsonTools.combine(tempfiles).usr_id

    let json2Ret = {
        "reward": {
            "get_mag": 0,
            "dvl_before": dvl_before,
            "item": items,
            "usr_lv": {
                "exp_pre": 799,
                "level": 5,
                "exp_next": [
                    717,
                    967
                ],
                "id": usr_id,
                "exp_new": 799
            },
            "smn_lv": [],
            "smn_skill_ids": [
                14010
            ],
            "curr_mag": 0,
            "dbl_exp_plus": 0,
            "usr_exp_plus": 0,
            "magatama_rate": 1,
            "get_money": 0,
            "smn": smn_before,
            "item_magatama": [],
            "smn_exp_plus": 0,
            "curr_money": 0,
            "assist": [],
            "dvl_lv": [
            ],
            "item_tag": [
            ],
            "dvl": dvl_before
        },
        "is_again": false,
        "consume_ap": 0,
        "is_magatama_max": false,
        "is_advice_usable": false,
        "is_first": true,
        "res_code": 0,
        "client_wait": 0,
        "is_read": false,
        "drama": stage,
        "clear_tm": 32000,
        "best_tm": 30000,
        "usr": usr,
        "is_best_record": true,
        "bonus_exp": 35,
        "is_magatama_sell": false,
        "is_card_max": false
    }

    return json2Ret

}


module.exports = { BattleResult };