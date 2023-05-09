// Require FS
const fs = require("fs");

function LoadInfo(req, res) {
    fs.readFile('json/LoadInfo.json', function (err, data) {
        res.status(200).write(data);
        res.end();
        if (err) throw err;
      });
}

module.exports = { LoadInfo };