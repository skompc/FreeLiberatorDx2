const fs = require("fs");
const devilTools = require("../tools/devilTools")
const decrypt = require("../tools/decrypt")

function SummonerSkillLearn(req, res) {
    let params = decrypt.stringToJsonObject(decrypt.decrypt(req.query.param));

    let uniq = params.uniq;
    let skill_id = params.skill_id;
    let result = devilTools.learnSkill(uniq, skill_id)
    res.status(200).json({summoner:result,"res_code": 0,"client_wait": 0});
}

module.exports = { SummonerSkillLearn };