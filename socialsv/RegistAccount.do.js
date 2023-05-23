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

    var accid = makeId(12);
//    var transid = makeId(10);
var transid = accid
//    var uuid = makeId(32);
var uuid = accid
//    var fid = makeId(8);
var fid = accid

    const dir = `./data/players/${uuid}/`;
    fs.mkdirSync(dir, { recursive: true });

    tools.move("./json/base/igt_list.json", dir + "igtlist.json")
    tools.move("./json/base/setting_data.json", dir + "setting_data.json")
    tools.move("./json/base/new_player.json", dir + "main.json")
    tools.addTo(dir + "main.json", "friend_id", fid)
    tools.addTo(dir + "main.json", "ek", accid)
    tools.addTo(dir + "main.json", "usr_id", fid)
    
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