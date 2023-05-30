const fs = require("fs");
const tools = require("../tools/jsonTools")
const paramTools = require("../tools/paramTools")

function TutorialFinish(req, res) {
    let input = JSON.stringify(req.query);
    let params = JSON.parse(paramTools.clean(input,0,0));
    tools.addTo("./data/players/0/main.json", "tutorial_step", params["step"])
    tools.addTo("./data/players/0/main.json", "tutorial_quest_id", 0)
    tools.addTo("./data/players/0/main.json", "tutorial_quest_name", "")
    tools.addTo("./data/players/0/main.json", "tutorial_prefix", "")

    res.status(200).json(
        {
            res_code:0,
            client_wait:0
        }
    )
}

module.exports = { TutorialFinish};