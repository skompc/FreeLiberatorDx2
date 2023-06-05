const tools = require("../tools/jsonTools")

function update(input) {
  const data = JSON.parse(fs.readFileSync("./data/players/0/devils.json"))
  const devilsOwned = data.devils;
  const devils2Add = input;

  devils2Add.forEach((object1) => {
    const index = devilsOwned.findIndex((object2) => object2.uniq === object1.uniq);  
      if (index !== -1) {
        devilsOwned[index] = object1;
      } else {
        devilsOwned.push(object1);
      }
  });

  data["devils"] = devilsOwned;
  data["devil_num"] = devilsOwned.length;
  let file2Write = JSON.stringify(data, null, 4);
  fs.writeFileSync("./data/players/0/devils.json", file2Write);
}

function make(id, rarity, lvl, str, vit, mag, agi, luk, arc, skills, ai_type, dr, wk, av, spt, rp, ct){
  var makeuniq = function (numChars) {
    let ID = "";
    let characters = "123456789";
    for ( var i = 0; i < numChars; i++ ) {
      ID += characters.charAt(Math.floor(Math.random() * 9));
    }
    return ID;
  }
var devil = {
  skl: skills,
  id: id,
  lv: lvl,
  str: str,
  vit: vit,
  mag: mag,
  mp: mag,
  mpmx: mag,
  ai_auto_type: ai_type,
  agi: agi,
  luk: luk,
  arc: arc,
  uniq: parseInt(makeuniq(11)),
  patk: Math.floor(str * 2.1 + lvl * 5.6 + 50),
  pdef: Math.floor(str * 0.5 + vit * 1.1 + lvl * 5.6 + 50),
  matk: Math.floor(mag * 2.1 + lvl * 5.6 + 50),
  mdef: Math.floor(mag * 0.5 + vit * 1.1 + lvl * 5.6 + 50),
  hp: Math.floor(vit * 2.1 + lvl * 5.6 + 50),
  hpmx: Math.floor(vit * 2.1 + lvl * 5.6 + 50),
  exceed_info: {
    opened_num: 0
  },
  recommend_type: 0,
  additional_skl: [],
  limitbreak: {
      effect: [],
      num: 60,
      open: []
  },
  is_awk: false,
  dr: 0,
  limitbreak_skl: [],
  exp: 0,
  "is_new": true,
  "mgtms": [],
  dr: dr,
  wk: wk,
  av: av,
  spt: spt,
  rp: rp,
  contents_type: ct,
  rarity: rarity
}
return devil;

}

function add2Party(summoner, party, pos, uniq){
  const data = JSON.parse(fs.readFileSync("./data/players/0/party.json"))
  data.parties[summoner-1].data[party-1].devils[pos] = parseInt(uniq)
  fs.writeFileSync('./data/players/0/party.json', JSON.stringify(data, null, 2));
}

function devilSearch(uniq){
  const searchUniq = uniq;

  const files = [
    "./data/players/0/devils.json"
  ];


  const playerData = tools.combine(files)


  // Loop through the sub-objects in the JSON array
  for (const subObj of playerData.devils) {
      // Check if the current sub-object has the desired unique identifier
      if (subObj.uniq == searchUniq) {
          // If the unique identifier is found, return the sub-object
          subObj.pressturn = 1;
          return subObj;
      }
  }
  const removeMeObject = { remove_me: true };
  return removeMeObject;
}

function updateHomeParty(id, slot){
  const data = JSON.parse(fs.readFileSync("./data/players/0/home.json"))
  data.party[slot] = parseInt(id)
  fs.writeFileSync('./data/players/0/home.json', JSON.stringify(data, null, 2));
}

function summonerDevilSearch(id){
  const searchId = id;

  const files = [
    "./data/players/0/party.json"
  ];

  const playerData = tools.combine(files)

  for (const subObj of playerData.parties) {
      if (subObj.summoner == searchId) {
          return subObj;
      }
  }
}

function learnSkill(uniq, skillId) {
  const jsonData = JSON.parse(fs.readFileSync("./data/players/0/party.json"));
  const summoners = jsonData.summoners;
  const summoner = summoners.find((s) => s.uniq == uniq);
  if (summoner) {
    const lineup = summoner.lineup;
    const skill = lineup.find((s) => s.id == parseInt(skillId));
    if (skill) {
      skill.is_learned = true;
      console.log(typeof(skillId))
      summoner.skl.push(+skillId);
      summoner.skl_p = parseInt(parseInt(summoner.skl_p) - 1)
      const updatedJsonData = JSON.stringify(jsonData, null, 4);
      fs.writeFileSync("./data/players/0/party.json", updatedJsonData);
      return summoner;
    }
  }
  return false;
}


module.exports = { update, make, add2Party, devilSearch, updateHomeParty, learnSkill, summonerDevilSearch};