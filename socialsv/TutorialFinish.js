const fs = require("fs");
const tools = require("../tools/jsonTools")
const decrypt = require("../tools/decrypt");

function TutorialFinish(req, res) {
    let params = decrypt.stringToJsonObject(decrypt.decrypt(req.query.param));
    tools.addTo("./data/players/0/main.json", "tutorial_step", params.step)
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