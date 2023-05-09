// Require FS
const fs = require("fs");

function GetUrl(req, res) {
    fs.readFile('json/GetUrl.json', function (err, data) {
        res.status(200).write(data);
        res.end();
        if (err) throw err;
      });
}

module.exports = { GetUrl };