function CpProcuctList(req, res) {
    res.status(200).json(
        {
         "beginner_mission": { "is_badge": false, "is_display": false }, 
         "main_mission": { "currents": [], "is_display": false }, 
         "tm": "20", 
         "product_list": [],
          "comeback_mission": { "is_badge": false, "is_display": false },
           "res_code": 0, 
           "client_wait": 0 }
    )
}

module.exports = { CpProcuctList };