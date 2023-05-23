// Require FS
const fs = require("fs");

const tools = require("../tools/jsonTools")

function RegistAccount(req, res) {
    var makeId = function (numChars) {
        let ID = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for ( var i = 0; i < numChars; i++ ) {
          ID += characters.charAt(Math.floor(Math.random() * 36));
        }
        return ID;
      }

    var accid = makeId(8);
    var transid = accid
    var fid = accid
    var uid = accid
    var uuid = 0

    const dir = `./data/players/${uuid}/`;
    fs.mkdirSync(dir, { recursive: true });

    tools.move("./json/base/igt_list.json", dir + "igt_list.json")
    tools.move("./json/base/setting_data.json", dir + "setting_data.json")
    tools.move("./json/base/new_player.json", dir + "main.json")
    tools.move("./json/base/devils.json", dir + "devils.json")
    tools.addTo(dir + "main.json", "friend_id", fid)
    tools.addTo(dir + "main.json", "ek", accid)
    tools.addTo(dir + "main.json", "usr_id", uid)
    
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