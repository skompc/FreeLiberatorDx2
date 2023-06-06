const fs = require("fs");
const tools = require("../tools/jsonTools");
const devilTools = require("../tools/devilTools")

function Home(req, res) {

    let file = [
        "./data/players/0/party.json"
    ]

    let file2 = [
        "./data/players/0/usr.json"
    ]

    let data0 = tools.combine(file)
    let data_usr = tools.combine(file2)

    let summoner = data_usr.usr["smn_id"]
    var uniq0 = parseInt(devilTools.partySearch(summoner, 1, 0))
    var uniq1 = parseInt(devilTools.partySearch(summoner, 1, 1))
    var uniq2 = parseInt(devilTools.partySearch(summoner, 1, 2))
    var uniq3 = parseInt(devilTools.partySearch(summoner, 1, 3))

    var devil0 = devilTools.devilSearch(uniq0);
    var devil1 = devilTools.devilSearch(uniq1);
    var devil2 = devilTools.devilSearch(uniq2);
    var devil3 = devilTools.devilSearch(uniq3);

    var devil0_id = devil0["id"]
    var devil1_id = devil1["id"]
    var devil2_id = devil2["id"]
    var devil3_id = devil3["id"]

    devilTools.updateHomeParty(devil0_id, 0)
    devilTools.updateHomeParty(devil1_id, 1)
    devilTools.updateHomeParty(devil2_id, 2)
    devilTools.updateHomeParty(devil3_id, 3)

    let files = [
        "./data/players/0/main.json",
        "./data/players/0/igt_list.json",
        "./data/players/0/setting_data.json",
        "./data/players/0/usr.json",
        "./data/players/0/home.json",
        "./data/players/0/devils.json"
    ];
    let data = tools.combine(files);

    data["client_wait"] = 0;
    data["res_code"] = 0;

    res.status(200).json(data);
}

module.exports = { Home };