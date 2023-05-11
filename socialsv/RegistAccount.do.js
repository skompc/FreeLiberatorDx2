// Require FS
const fs = require("fs");

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
    var transid = makeId(10);
    //var uuid = makeId(32);
    var fid = makeId(8);

    uuid = "0";


    var data = fs.readFileSync("./json/RegistAccount.json");

    const dir = `./data/players/${uuid}/`;
    fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
            console.error(`Error creating directory: ${err.message}`);
          } else {
            console.log(`Created directory: ${dir}`);
          }
        });

fs.writeFile("data/players/" + uuid + "/player.json", data, err => {
  if (err) {
    throw err
  }
  console.log('JSON data is saved.')
})


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