// Require FS
const fs = require("fs");

const tools = require("../tools/jsonTools")

function RegistAccount(req, res) {
    var accid = 12345678;
    var transid = accid
    var fid = accid
    var uid = accid
    var uuid = 0

    const dir = `./data/players/${uuid}/`;
    const temp_dir = "./data/players/0/temp/"
    fs.mkdirSync(temp_dir, { recursive: true });

    tools.move("./json/base/igt_list.json", dir + "igt_list.json")
    tools.move("./json/base/setting_data.json", dir + "setting_data.json")
    tools.move("./json/base/new_player.json", dir + "main.json")
    tools.move("./json/base/devils.json", dir + "devils.json")
    tools.move("./json/base/facility.json", dir + "facility.json")
    tools.move("./json/base/map.json", dir + "map.json")
    tools.move("./json/base/missions.json", dir + "missions.json")
    tools.move("./json/base/society.json", dir + "society.json")
    tools.move("./json/base/party.json", dir + "party.json")
    tools.move("./json/base/usr.json", dir + "usr.json")
    tools.move("./json/base/home.json", dir + "home.json")
    tools.addTo(dir + "main.json", "friend_id", fid)
    tools.addTo(dir + "main.json", "ek", accid)
    tools.addTo(dir + "main.json", "usr_id", uid)

    tools.addTo(dir + "usr.json", "usr_id", uid)
    
    res.status(200).json(
        {
            account_id: accid,
            transfer_id:transid,
            uuid:uuid,
            res_code:0,
            client_wait:0
        }
    )

}



module.exports = { RegistAccount };