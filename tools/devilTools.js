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

function make(id, rarity, lvl, str, vit, mag, agi, luk, arc, skills, ai_type, dr, wk, av, spt, rp, ct, uniq){
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
    uniq: parseInt(uniq),
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
    is_new: true,
    mgtms: [],
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
  console.log("test")
  const files = [
    "./data/players/0/party.json"
  ];

  let playerData = tools.combine(files)

  let updated = false; // Flag to track if the object was updated
  
  for (const subObj of playerData.parties) {
    if (subObj.summoner == summoner) {
      console.log("summoner found: " + subObj.summoner)
      for (let i = 0; i < subObj.data.length; i++) {
        const subObj2 = subObj.data[i];
        if (subObj2.idx == party) {
          console.log("party found: " + subObj2.idx)
          subObj2.devils[pos] = parseInt(uniq);
          subObj.data.splice(i, 1); // Delete the original subObj2
          subObj.data.push(subObj2); // Push the updated subObj2
          console.log("subObj round 1")
          console.log()
          console.log(subObj)
          updated = true; // Set the flag to true to indicate the object was updated
          break; // Break out of the loop since the object was updated
        }
      }
      if (updated) {
        console.log("subObj round 2")
        console.log()
        console.log(subObj)
        playerData.parties.splice(playerData.parties.indexOf(subObj), 1); // Delete the original subObj
        playerData.parties.push(subObj); // Push the updated subObj
        fs.writeFileSync("./data/players/0/party.json", JSON.stringify(playerData, null, 4))
        break; // Break out of the loop since the object was updated
      }
    }
  }
}

function partySearch(summoner, idx, pos){
  const files = [
    "./data/players/0/party.json"
  ];

  let playerData = tools.combine(files)

  for (const subObj of playerData.parties) {
    if (subObj.summoner == summoner) {
      console.log("summoner found: " + subObj.summoner)
      for (let i = 0; i < subObj.data.length; i++) {
        const subObj2 = subObj.data[i];
        if (subObj2.idx == idx) {
          console.log("party found: " + subObj2.idx)
          return subObj2.devils[pos];
        }
      }
    }
  }

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

function devilLevel(uniq, exp){
  const searchUniq = uniq;

  const files = [
    "./data/players/0/devils.json"
  ];

  const playerData = tools.combine(files)

  for (const subObj of playerData.devils) {
      if (subObj.uniq == searchUniq) {
        subObj.exp = subObj.exp + exp;
        while (subObj.exp >= 100){
          subObj.exp = subObj.exp - 100;
          subObj.lv = subObj.lv + 1;
          subObj.str = subObj.str + 1;
          subObj.vit = subObj.vit + 1;
          subObj.mag = subObj.mag + 1;
          subObj.agi = subObj.agi + 1;
          subObj.arc = subObj.arc + 1;
        }
        console.log(subobj.lv);
        new_devil = make(subObj.id, subObj.rarity, subObj.lv, subObj.str, subObj.vit, subObj.mag, subObj.agi, subObj.luk, subObj.arc, subObj.skills, subObj.ai_auto_type, subObj.dr, subObj.wk, subObj.av, subObj.spt, subObj.rp, subObj.ct, subObj.uniq);
        const devils2Return = [new_devil]
        update(devils2Return);
      }
  }
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
      summoner.skl.push(+skillId);
      summoner.skl_p = parseInt(parseInt(summoner.skl_p) - 1)
      const updatedJsonData = JSON.stringify(jsonData, null, 4);
      fs.writeFileSync("./data/players/0/party.json", updatedJsonData);
      return summoner;
    }
  }
  return false;
}

function summonerLevel(id, exp){
  const searchId = id;

  const files = [
    "./data/players/0/party.json"
  ];

  const playerData = tools.combine(files)

  for (const subObj of playerData.summoners) {
    if (subObj.id == searchId) {
      subObj.exp = subObj.exp + exp;
      while (subObj.exp >= 100){
        subObj.exp = subObj.exp - 100;
        subObj.level = subObj.level + 1;
        subObj.skl_p = subObj.skl_p + 1;
      }
      console.log(subObj.level);
      tools.addTo("./data/players/0/party.json", "summoners", playerData.summoners);
    }
  }
}

function usrLevel(exp){
  const files = [
    "./data/players/0/usr.json"
  ];

  const data = tools.combine(files);
  data.usr["exp"] = data.usr["exp"] + 100;
  while (data.usr["exp"] >= 100){
    data.usr["exp"] = data.usr["exp"] - 100;
    data.usr["lv"] = data.usr["lv"] + 1;
  }
  console.log(data.usr["lv"]);
  tools.addTo("./data/players/0/usr.json", "usr", data.usr);

}


module.exports = { update, make, add2Party, devilSearch, updateHomeParty, learnSkill, summonerDevilSearch, devilLevel, summonerLevel, usrLevel, partySearch};