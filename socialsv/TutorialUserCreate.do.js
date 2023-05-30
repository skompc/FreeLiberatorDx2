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

    let usr = tools.combine(["./data/players/0/usr.json"])
    usr["name"] = params.name

    let update_devils = [
        {
            "agi": 13,
            "exceed_info": {
                "opened_num": 0
            },
            "hpmx": 54,
            "luk": 10,
            "devicon_power": 242,
            "hp": 54,
            "recommend_type": 0,
            "lv": 1,
            "additional_skl": [],
            "mdef": 71,
            "limitbreak": {
                "effect": [],
                "num": 60,
                "open": []
            },
            "is_awk": false,
            "dr": 0,
            "ai_auto_type": 2,
            "mag": 10,
            "limitbreak_skl": [],
            "arc": 0,
            "wk": 0,
            "skl": [
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
            ],
            "id": 11710,
            "patk": 85,
            "exp": 0,
            "vit": 10,
            "st": 0,
            "pdef": 73,
            "mp": 10,
            "mgtm_effs": [],
            "lock_ex_skl": [
                true
            ],
            "is_new": true,
            "mgtms": [],
            "str": 14,
            "av": 32,
            "spt": 0,
            "uniq": 10411263562,
            "matk": 76,
            "mpmx": 10,
            "rp": 0,
            "rarity": 1,
            "contents_type": 0
        },
        {
            "agi": 16,
            "exceed_info": {
                "opened_num": 0
            },
            "hpmx": 63,
            "luk": 10,
            "devicon_power": 247,
            "hp": 63,
            "recommend_type": 1,
            "lv": 1,
            "additional_skl": [],
            "mdef": 73,
            "limitbreak": {
                "effect": [],
                "num": 60,
                "open": []
            },
            "is_awk": false,
            "dr": 0,
            "ai_auto_type": 1,
            "mag": 10,
            "limitbreak_skl": [],
            "arc": 0,
            "wk": 64,
            "skl": [
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
            ],
            "id": 12310,
            "patk": 74,
            "exp": 0,
            "vit": 12,
            "st": 8,
            "pdef": 73,
            "mp": 10,
            "mgtm_effs": [],
            "lock_ex_skl": [
                true
            ],
            "is_new": true,
            "mgtms": [],
            "str": 9,
            "av": 0,
            "spt": 0,
            "uniq": 10411263561,
            "matk": 76,
            "mpmx": 10,
            "rp": 0,
            "rarity": 1,
            "contents_type": 0
        }
    ];
    devilTools.update(update_devils);

    jsonData["tutorial_step"] = 2;
    jsonData["tutorial_quest_id"] = 1;
    jsonData["tutorial_quest_name"] = "First Battle";
    jsonData["update_devils"] = update_devils;

    res.status(200).json(jsonData)
}

module.exports = { TutorialUserCreate };