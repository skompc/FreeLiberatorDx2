const fs = require("fs");
const tools = require("../tools/jsonTools")
const paramTools = require("../tools/paramTools")
const devilTools = require("../tools/devilTools")

function TutorialUserCreate(req, res) {
    let input = JSON.stringify(req.query);
    let params = JSON.parse(paramTools.clean(input,0,0));

    let files = [
        "./data/players/0/main.json"
    ]
    let files2 = [
        "./data/players/0/party.json"
    ]
    let files3 = [
        "./data/players/0/usr.json"
    ]

    let jsonData = tools.combine(files)
    let jsonData2 = tools.combine(files2)
    let jsonData3 = tools.combine(files3)

    gender = parseInt(params.gender) + 1

    jsonData["user_name"] = params.name

    jsonData2.summoners[0].id = gender
    jsonData2.parties[0].summoner = gender

    jsonData3["name"] = params.name
    jsonData3.usr["name"] = params.name
    jsonData3.usr["smn_id"] = gender

    fs.writeFileSync("./data/players/0/main.json", JSON.stringify(jsonData, null, 4))
    fs.writeFileSync("./data/players/0/party.json", JSON.stringify(jsonData2, null, 4))
    fs.writeFileSync("./data/players/0/usr.json", JSON.stringify(jsonData3, null, 4))

    tools.addTo("./data/players/0/main.json", "tutorial_step", 2)
    tools.addTo("./data/players/0/main.json", "tutorial_quest_id", 1)
    tools.addTo("./data/players/0/main.json", "tutorial_quest_name", "First Battle")

    tools.addTo("./data/players/0/usr.json", "name", params.name)

    let skills1 = [
        {
            "lv": 1,
            "id": 1001
        },
        {
            "lv": 1,
            "id": 1101
        },
        {
            "lv": 1,
            "id": 2018
        },
        {
            "lv": 0,
            "id": 0
        },
        {
            "lv": 0,
            "id": 0
        },
        {
            "lv": 0,
            "id": 0
        },
        {
            "lv": 0,
            "id": 0
        }
    ]
    let skills2 = [
        {
            "lv": 1,
            "id": 1128
        },
        {
            "lv": 1,
            "id": 2001
        },
        {
            "lv": 1,
            "id": 102117
        },
        {
            "lv": 0,
            "id": 0
        },
        {
            "lv": 0,
            "id": 0
        },
        {
            "lv": 0,
            "id": 0
        },
        {
            "lv": 0,
            "id": 0
        }
    ]

    let uniq1 = tools.makeuniq(11);
    let uniq2 = tools.makeuniq(11);

    let update_devils = [
        devilTools.make(11710, 1, 1, 14, 10, 10, 13, 10, 0, skills1, 2, 0, 0, 32, 0, 0, 0, uniq1, 0),
        devilTools.make(12310, 1, 1, 9, 12, 10, 16, 10, 0, skills2, 1, 0, 64, 0, 0, 0, 0, uniq2, 0)
    ];

    devilTools.update(update_devils);

    devilTools.add2Party(gender, 1, 0, parseInt(uniq1))
    devilTools.add2Party(gender, 1, 1, parseInt(uniq2))

    devilTools.updateHomeParty(11710, 0)
    devilTools.updateHomeParty(12310, 1)

    jsonData["tutorial_step"] = 2;
    jsonData["tutorial_quest_id"] = 1;
    jsonData["tutorial_quest_name"] = "First Battle";
    jsonData["update_devils"] = update_devils;

    res.status(200).json(jsonData)
}

module.exports = { TutorialUserCreate };