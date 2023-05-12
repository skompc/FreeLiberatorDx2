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


    //var data = fs.readFileSync("./json/RegistAccount.json");

    const dir = `./data/players/${uuid}/`;
    fs.mkdirSync(dir, { recursive: true });

    const files = ['./json/base/basedata_version.json', './json/base/igt_list.json', './json/base/rand_names.json', "./json/RegistAccount.json"];
    let jsonData = [];
    
    files.forEach(file => {
        const data = fs.readFileSync(file, 'utf8');
        jsonData.push(JSON.parse(data));
    });

    jsonData.push({friend_id:fid,ek:accid,usr_id:fid});

    const transformedData = jsonData.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});
    
    const combinedData = JSON.stringify(transformedData, null, 4);

fs.writeFile("data/players/" + uuid + "/player.json", combinedData, err => {
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