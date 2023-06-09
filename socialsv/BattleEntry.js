const fs = require("fs");
const tools = require("../tools/jsonTools")
const devilTools = require("../tools/devilTools")
const paramTools = require("../tools/paramTools")

function BattleEntry(req, res) {
    var input = JSON.stringify(req.query);
    var params = JSON.parse(paramTools.clean(input,0,0));

    let stage = params["stage"]
    let main_smn = params["main_smn"]
    let sub_smn = params["sub_smn"]
    let main_idx = params["main_idx"]
    let sub_idx = params["sub_idx"]
    let smn_id = params["smn_id"]
    let helper = params["helper"]
    let is_auto = params["is_auto"]

    console.log(main_smn)

    let files = [
        `./json/battles/story/${stage}/0.json`
    ];
    let data = tools.combine(files);

    var quest = data

    var uniq0 = parseInt(devilTools.partySearch(main_smn, main_idx, 0))
    var uniq1 = parseInt(devilTools.partySearch(main_smn, main_idx, 1))
    var uniq2 = parseInt(devilTools.partySearch(main_smn, main_idx, 2))
    var uniq3 = parseInt(devilTools.partySearch(main_smn, main_idx, 3))

    var sub_uniq0 = parseInt(devilTools.partySearch(sub_smn, sub_idx, 0))
    var sub_uniq1 = parseInt(devilTools.partySearch(sub_smn, sub_idx, 1))
    var sub_uniq2 = parseInt(devilTools.partySearch(sub_smn, sub_idx, 2))
    var sub_uniq3 = parseInt(devilTools.partySearch(sub_smn, sub_idx, 3))

    var devil0 = devilTools.devilSearch(uniq0);
    var devil1 = devilTools.devilSearch(uniq1);
    var devil2 = devilTools.devilSearch(uniq2);
    var devil3 = devilTools.devilSearch(uniq3);

    var sub_devil0 = devilTools.devilSearch(sub_uniq0);
    var sub_devil1 = devilTools.devilSearch(sub_uniq1);
    var sub_devil2 = devilTools.devilSearch(sub_uniq2);
    var sub_devil3 = devilTools.devilSearch(sub_uniq3);

    const array2filter = [
        devil0,
        devil1,
        devil2,
        devil3,
    ];

    const array2filter2 = [
        sub_devil0,
        sub_devil1,
        sub_devil2,
        sub_devil3,
    ];

    const devils = array2filter.filter((element) => !element.remove_me);
    const sub_devils = array2filter2.filter((element) => !element.remove_me);

    var summoner = devilTools.findSummoner(main_smn)
    var sub_summoner = devilTools.findSummoner(sub_smn)

    var parties = [
        {
            devils: devils,
            summoner: summoner
        },
        {
            devils: sub_devils,
            summoner: sub_summoner
        }
    ];

    var allDevils = [devils, sub_devils]
    tools.addTo("./data/players/0/temp1.json", "dvl_before", allDevils)

    quest.parties = parties;

    res.status(200).json(quest);
}

module.exports = { BattleEntry };