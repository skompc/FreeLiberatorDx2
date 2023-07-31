function blank(req, res) {
    res.status(200).json({res_code:0, client_wait:0})
}

module.exports = { blank };