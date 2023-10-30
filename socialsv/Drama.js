const fs = require("fs");
const decrypt = require("../tools/decrypt")

function Drama(req, res) {
    let params = decrypt.stringToJsonObject(decrypt.decrypt(req.query.param));
    var path = decodeURIComponent(params.path);
    let data;
    if (fs.existsSync(`./json/dramas/${path}.json`)) {
        let file = fs.readFileSync(`./json/dramas/${path}.json`, "utf8");
        data = JSON.parse(file);
    } else {
        data = {
            "select_history": [],
            "res_code": 0,
            "client_wait": 0,
            "selects": [],
            "names": [],
            "texts": [{
                "id": 0,
                "text": "[cus color=emphasis]Error:[cus color=end] Drama Not Found."
            }
            ],
            "commands": [],
            "charas": []
        }
    }

    res.status(200).json(data);
}

module.exports = { Drama };