// Require FS
const fs = require("fs");

function Title(req, res) {
    fs.readFile('json/common/Title.json', function (err, data) {
        res.status(200).write(data);
        res.end();
        if (err) throw err;
      });
}

module.exports = { Title };