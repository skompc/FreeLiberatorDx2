const fs = require("fs");
const tools = require("../tools/jsonTools")
const paramTools = require("../tools/paramTools")

function IngameTutorialEnd(req, res) {
    var input = JSON.stringify(req.query);
    var params = JSON.parse(paramTools.clean(input,0,0));

    let igt = params["tutorial_id"]
    let files = [
        `./data/players/0/igt_list.json`
    ];
    let data = tools.combine(files);

    var numbersArray = data.igt_list;

    var numberToRemove = igt;

    var filteredArray = numbersArray.filter(function(number) {
        return number !== numberToRemove;
    });

    data.igt_list = filteredArray;

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

module.exports = { IngameTutorialEnd };