const fs = require("fs");
const paramTools = require("../tools/paramTools")
const questTools = require("../tools/questTools")

function DramaQuest(req, res) {
  res.status(200).json({res_code:0, client_wait:0})
  let input = JSON.stringify(req.query);
  let params = JSON.parse(paramTools.clean(input,0,0));
  let quest = params["quest_id"]
  questTools.updateQuests(quest)
}

module.exports = { DramaQuest };