const fs = require("fs")
const tools = require("../tools/jsonTools");

function Login(req, res) {
    let uuid = req.query.uuid;
    let check_code = req.query.check_code;
    let files = [
        "./data/players/" + uuid + "/main.json",
        "./data/players/" + uuid + "/igt_list.json",
        "./data/players/" + uuid + "/setting_data.json",
        "./json/base/basedata_version.json",
        "./json/base/rand_names.json"
    ];
    let data = tools.combine(files);

    data["client_wait"] = 0;
    data["res_code"] = 0;
    data["latest_version"] = check_code;

    res.status(200).json(data);
    
}

module.exports = { Login };