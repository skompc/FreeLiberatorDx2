const fs = require("fs");
const tools = require("../tools/jsonTools")
const decrypt = require("../tools/decrypt");

function IngameTutorialCheck(req, res) {
    let params = decrypt.stringToJsonObject(decrypt.decrypt(req.query.param));

    let igt = params.igt_id;
    let files = [
        `./data/players/0/igt_list.json`
    ];
    let data = tools.combine(files);

    var numbersArray = data.igt_list;

    var numberToCheck = igt;
    

    tools.addTo("./data/players/0/igt_list.json", "igt_list", data.igt_list);

    res.status(200).json(
        {
            igt_id: igt,
            igt_list: data.igt_list,
            res_code:0,
            client_wait:0
        }
    )
}

module.exports = { IngameTutorialCheck };