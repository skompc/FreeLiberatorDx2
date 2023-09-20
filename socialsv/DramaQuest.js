const fs = require("fs");
const decrypt = require("../tools/decrypt");
const questTools = require("../tools/questTools");

function DramaQuest(req, res) {
  res.status(200).json({res_code:0, client_wait:0})
  let params = decrypt.stringToJsonObject(decrypt.decrypt(req.query.param));
  let quest = params.quest_id;
  questTools.updateQuests(quest)
}

module.exports = { DramaQuest };