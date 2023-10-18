const fs = require("fs");
const tools = require("../tools/jsonTools")
const devilTools = require("../tools/devilTools")

function TutorialBattleEntry(req, res) {
    let files = [
        "./json/battles/tutorial/0.json"
    ];
    let data = tools.combine(files);

    var quest = data

    const files2 = [
        "./data/players/0/party.json"
      ];

      const files3 = [
        "./data/players/0/usr.json"
      ]
    
    
      const party = tools.combine(files2)
      const usr = tools.combine(files3)

      let gender = usr.usr["smn_id"]

    var uniq0 = parseInt(devilTools.partySearch(gender, 1, 0))
    var uniq1 = parseInt(devilTools.partySearch(gender, 1, 1))

    var devil0 = devilTools.devilSearch(uniq0);
    var devil1 = devilTools.devilSearch(uniq1);

    const devils = [
        devil0,
        devil1
    ];

    var summoner = party.summoners[0];

    var parties = [{
        devils,
        summoner
    }];

    quest.parties = parties;

    res.status(200).json(quest);
}

module.exports = { TutorialBattleEntry };