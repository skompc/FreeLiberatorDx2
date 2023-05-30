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
    let jsonData = tools.combine(files)

    jsonData["user_name"] = params.name
    jsonData["gnd"] = params.gender

    tools.addTo("./data/players/0/main.json", "user_name", params.name)
    tools.addTo("./data/players/0/main.json", "gnd", params.gender)
    tools.addTo("./data/players/0/main.json", "tutorial_step", 2)
    tools.addTo("./data/players/0/main.json", "tutorial_quest_id", 1)
    tools.addTo("./data/players/0/main.json", "tutorial_quest_name", "First Battle")

    tools.addTo("./data/players/0/usr.json", "name", params.name)
    tools.addTo("./data/players/0/usr.json", "gnd", params.gender)
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

    let update_devils = [
        devilTools.make(11710, 1, 1, 14, 10, 10, 13, 10, 0, skills1, 2, 0, 0, 32, 0, 0, 0),
        devilTools.make(12310, 1, 1, 9, 12, 10, 16, 10, 0, skills2, 1, 0, 64, 0, 0, 0, 0)
    ];
    devilTools.update(update_devils);
    devilTools.add2Party(1, 1, 0, update_devils[0].uniq)
    devilTools.add2Party(1, 1, 1, update_devils[1].uniq)

    devilTools.updateHomeParty(11710, 0)
    devilTools.updateHomeParty(12310, 1)

    jsonData["tutorial_step"] = 2;
    jsonData["tutorial_quest_id"] = 1;
    jsonData["tutorial_quest_name"] = "First Battle";
    jsonData["update_devils"] = update_devils;

    res.status(200).json(jsonData)
}

module.exports = { TutorialUserCreate };