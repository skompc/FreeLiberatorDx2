function Chat(req, res) {
    res.status(200).json({
            "chat": [],
            "channel": 700,
            "interval": 5,
            "res_code": 0,
            "client_wait": 0

    })
}

module.exports = { Chat };