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

    const files2 = [
        "./data/players/0/party.json"
      ];
    
    
      const party = tools.combine(files2)
      var smn_party = devilTools.summonerDevilSearch(2)
      console.log(smn_party)

    var uniq0 = smn_party.data[main_idx - 1].devils[0];
    var uniq1 = smn_party.data[main_idx - 1].devils[1];
    var uniq2 = smn_party.data[main_idx - 1].devils[2];
    var uniq3 = smn_party.data[main_idx - 1].devils[3];

    var devil0 = devilTools.devilSearch(uniq0);
    var devil1 = devilTools.devilSearch(uniq1);
    var devil2 = devilTools.devilSearch(uniq2);
    var devil3 = devilTools.devilSearch(uniq3);

    const array2filter = [
        devil0,
        devil1,
        devil2,
        devil3,
    ];
    console.log()
    console.log(array2filter[2])

    const devils = array2filter.filter((element) => !element.remove_me);
    console.log(devils)

    var summoner = party.summoners[main_smn - 1];

    var parties = [{
        devils,
        summoner
    }];

    quest.parties = parties;

    res.status(200).json(quest);
}

module.exports = { BattleEntry };