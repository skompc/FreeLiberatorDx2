function ChatStart(req, res) {
    res.status(200).json({
        res_code:0,
        client_wait:0,
        "room": [
            {
                "cat": "s",
                "chan": 0,
                "name": "システム",
                "say": 0
            },
            {
                "cat": "w",
                "chan": 701,
                "name": "ワールド",
                "say": 1
            },
            {
                "cat": "wgl",
                "chan": 0,
                "say": 1
            }
    ]})
}

module.exports = { ChatStart };