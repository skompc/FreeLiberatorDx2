const fs = require("fs");

function Helper(req, res) {
    res.status(200).json({
        "helpers": [],
        "helper_max": 1,
        "res_code": 0,
        "client_wait": 0
    });
}

module.exports = { Helper };