const fs = require("fs")
const tools = require("../tools/jsonTools");
const decrypt = require("../tools/decrypt")

function Login(req, res) {
    let dec_param = decrypt.stringToJsonObject(decrypt.decrypt(req.query.param));

    let uuid = dec_param.uuid;
    let check_code = dec_param.check_code;
    let files = [
        "./data/players/" + uuid + "/main.json",
        "./data/players/" + uuid + "/igt_list.json",
        "./data/players/" + uuid + "/setting_data.json",
        "./data/players/" + uuid + "/usr.json",
        "./json/common/basedata/basedata_version.json",
        "./json/common/rand_names.json"
    ];
    let data = tools.combine(files);

    data["client_wait"] = 0;
    data["res_code"] = 0;
    data["latest_version"] = check_code;

    res.status(200).json(data);
    
}

module.exports = { Login };