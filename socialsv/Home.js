const fs = require("fs");
const tools = require("../tools/jsonTools");

function Home(req, res) {

    let files = [
        "./data/players/0/main.json",
        "./data/players/0/igt_list.json",
        "./data/players/0/setting_data.json",
        "./data/players/0/usr.json",
        "./data/players/0/home.json",
        "./data/players/0/devils.json"
    ];
    let data = tools.combine(files);

    data["client_wait"] = 0;
    data["res_code"] = 0;

    res.status(200).json(data);
}

module.exports = { Home };