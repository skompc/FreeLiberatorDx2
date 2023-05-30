const fs = require("fs");

function TutorialFacility(req, res) {
    let file = fs.readFileSync("./json/tutorial/Facility.json", "utf8");
    let data = JSON.parse(file);
    res.status(200).json(data);
}

module.exports = { TutorialFacility };