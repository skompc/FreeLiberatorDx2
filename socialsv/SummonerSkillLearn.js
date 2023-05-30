const fs = require("fs");
const tools = require("../tools/jsonTools")
const devilTools = require("../tools/devilTools")
const paramTools = require("../tools/paramTools")

function SummonerSkillLearn(req, res) {
    let input = JSON.stringify(req.query);
    let params = JSON.parse(paramTools.clean(input,0,0));
    let uniq = params["uniq"]
    let skill_id = params["skill_id"]
    let result = devilTools.learnSkill(uniq, skill_id)
    res.status(200).json({summoner:result,"res_code": 0,"client_wait": 0});
}

module.exports = { SummonerSkillLearn };