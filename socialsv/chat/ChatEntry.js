function ChatEntry(req, res) {
    res.status(200).json({
        res_code:0,
        client_wait:0,
        "room_list": [
            "s",
            "w",
            "wgl"
        ],
        "key": "c2295f16-1c81-48b6-bd5f-a699ba77ac02"
    })
}

module.exports = { ChatEntry };