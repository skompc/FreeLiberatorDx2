const fs = require("fs");
const tools = require("../tools/jsonTools")
const devilTools = require("../tools/devilTools")
const decrypt = require("../tools/decrypt")

function BattleEntry(req, res) {
    let params = decrypt.stringToJsonObject(decrypt.decrypt(req.query.param));

    let stage = params.stage
    let main_smn = params.main_smn
    let sub_smn = params.sub_smn
    let main_idx = params.main_idx
    let sub_idx = params.sub_idx
    let smn_id = params.smn_id
    let helper = params.helper
    let is_auto = params.is_auto

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
  
    var sub_uniq0
    var sub_uniq1
    var sub_uniq2
    var sub_uniq3

    var devil0 = {}
    var devil1 = {}
    var devil2 = {}
    var devil3 = {}

    var sub_devil0 = {}
    var sub_devil1 = {}
    var sub_devil2 = {}
    var sub_devil3 = {}

    if(sub_smn != 0 ){
        sub_uniq0 = parseInt(devilTools.partySearch(sub_smn, sub_idx, 0))
        sub_uniq1 = parseInt(devilTools.partySearch(sub_smn, sub_idx, 1))
        sub_uniq2 = parseInt(devilTools.partySearch(sub_smn, sub_idx, 2))
        sub_uniq3 = parseInt(devilTools.partySearch(sub_smn, sub_idx, 3))
    }else{
        sub_uniq0 = 0
        sub_uniq1 = 0
        sub_uniq2 = 0
        sub_uniq3 = 0
    }

    if (uniq0 != 0){
        devil0 = devilTools.devilSearch(uniq0);
    }else{devil0 ={"remove_me":true};}

    if (uniq1 != 0){
        devil1 = devilTools.devilSearch(uniq1);
    }else{devil1 ={"remove_me":true}}

    if (uniq2 != 0){
        devil2 = devilTools.devilSearch(uniq2);
    }else{devil2 ={"remove_me":true}}

    if (uniq3 != 0){
        devil3 = devilTools.devilSearch(uniq3);
    }else{devil3 ={"remove_me":true}}


    if (sub_uniq0 != 0){
        sub_devil0 = devilTools.devilSearch(sub_uniq0);
    }else{sub_devil0 ={"remove_me":true}}

    if (sub_uniq1 != 0){
        sub_devil1 = devilTools.devilSearch(sub_uniq1);
    }else{sub_devil1 ={"remove_me":true}}

    if (sub_uniq2 != 0){
        sub_devil2 = devilTools.devilSearch(sub_uniq2);
    }else{sub_devil2 ={"remove_me":true}}

    if (sub_uniq3 != 0){
        sub_devil3 = devilTools.devilSearch(sub_uniq3);
    }else{sub_devil3 ={"remove_me":true}}



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

    fs.writeFileSync("./data/players/0/temp/battle.json", "{}")
    tools.addTo("./data/players/0/temp/battle.json", "enemies", data["enemies"])

    var allDevils = [...devils, ...sub_devils]
    fs.writeFileSync("./data/players/0/temp/dvl_before.json", "{}")
    tools.addTo("./data/players/0/temp/dvl_before.json", "dvl_before", allDevils)

    var allSmn = [summoner, sub_summoner];
    console.log("summoners: " + allSmn)
    allSmn = allSmn.filter(Boolean);
    fs.writeFileSync("./data/players/0/temp/smn_before.json", "{}")
    tools.addTo("./data/players/0/temp/smn_before.json", "smn_before", allSmn)

    fs.writeFileSync("./data/players/0/temp/devil_add.json", "{}")
    fs.writeFileSync("./data/players/0/temp/item.json", "{}")

    quest.parties = parties;

    res.status(200).json(quest);
}

module.exports = { BattleEntry };