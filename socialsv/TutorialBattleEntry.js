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
    
    
      const party = tools.combine(files2)

    var uniq0 = party.parties[0].data[0].devils[0];
    var uniq1 = party.parties[0].data[0].devils[1];

    var devil0 = JSON.parse(devilTools.devilSearch(uniq0));
    var devil1 = JSON.parse(devilTools.devilSearch(uniq1));

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