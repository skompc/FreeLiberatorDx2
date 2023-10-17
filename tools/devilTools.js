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

function make(id, rarity, lvl, str, vit, mag, agi, luk, arc, skills, ai_type, dr, wk, av, spt, rp, ct, uniq, exp){
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
    exp: exp,
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

function add2Party(summoner, idx, pos, uniq){
  const data = JSON.parse(fs.readFileSync("./data/players/0/party.json"))

  var summoner_pos = data.parties.filter(function(item) {
    return item.summoner == summoner;
  });

  var party_pos = summoner_pos.data.filter(function(item) {
    return item.idx == idx;
  });

  party_pos.devils[pos] = uniq;
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
  const removeMeObject = { remove_me: true, id: 0 };
  return removeMeObject;
}

function devilLevel(uniq, exp){
  const expArray = JSON.parse(fs.readFileSync("./json/common/exp_next.json", "utf8")).exp_next;
  const searchUniq = uniq;

  const files = [
    "./data/players/0/devils.json"
  ];

  const playerData = tools.combine(files)
  let lv
  let str
  let vit
  let mag
  let agi
  let arc
  let luk
  let exp1

  for (const subObj of playerData.devils) {
      if (subObj.uniq == searchUniq) {
        exp1 = subObj.exp + exp;
        let totalExp = subObj.exp
        let expRequirement = expArray[subObj.lv];
        lv = subObj.lv;
        str = subObj.str;
        vit = subObj.vit;
        mag = subObj.mag;
        agi = subObj.agi;
        arc = subObj.arc;
        luk = subObj.luk
        while (totalExp >= expRequirement){
          totalExp = totalExp - expRequirement
          lv = lv + 1;
          str = str + 1;
          vit = vit + 1;
          mag = mag + 1;
          agi = agi + 1;
          arc = arc + 1;
          luk = luk + 1;
          expRequirement = expArray[subObj.lv];
        }
        console.log("skills: " + subObj.skl)
        new_devil = make(subObj.id, subObj.rarity, lv, str, vit, mag, agi, luk, arc, subObj.skl, subObj.ai_auto_type, subObj.dr, subObj.wk, subObj.av, subObj.spt, subObj.rp, subObj.ct, subObj.uniq, exp1);
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

  let exp1
  let totalExp
  let now_lv_exp
  let level
  let skl_p
  let next_lv_exp


  for (const subObj of playerData.summoners) {
    if (subObj.id == searchId) {
      exp1 = subObj.exp + exp;
      totalExp = subObj.exp
      let expRequirement = 100 * subObj.lv;
      while (totalExp >= expRequirement){
        totalExp = totalExp - expRequirement;
        now_lv_exp = expRequirement;
        expRequirement = expRequirement + 100;
        level = level + 1;
        skl_p = skl_p + 1;
        next_lv_exp = expRequirement;
        subObj.exp = exp1
        subObj.now_lv_exp = now_lv_exp
        subObj.level = level
        subObj.skl_p = skl_p
        subObj.next_lv_exp = next_lv_exp
        console.log("summoner: " + JSON.stringify(subObj))
      }
      //subObj.exp = exp1
      //subObj.now_lv_exp = now_lv_exp
      //subObj.level = level
      //subObj.skl_p = skl_p
      //subObj.next_lv_exp = next_lv_exp
      //console.log("summoner: " + JSON.stringify(subObj))
      //tools.addTo("./data/players/0/party.json", "summoners", playerData.summoners);
    }
  }
}

function findSummoner(summoner_id){
  const files = [
    "./data/players/0/party.json"
  ];

  const playerData = tools.combine(files)

  for (const subObj of playerData.summoners) {
    if (subObj.id == summoner_id) {
      return subObj;
    }
  }
}

function usrLevel(exp){
  const files = [
    "./data/players/0/usr.json"
  ];

  const data = tools.combine(files);
  let totalExp = data.usr["exp"]
  let expRequirement = 100 * data.usr["lv"];
  while (totalExp >= expRequirement){
    totalExp = totalExp - expRequirement;
    expRequirement = expRequirement + 100;
    data.usr["lv"] = data.usr["lv"] + 1;
  }
  console.log(data.usr["lv"]);
  tools.addTo("./data/players/0/usr.json", "usr", data.usr);

}

function talkFind(tgt){
  const searchUniq = tgt;

  const files = [
    "./data/players/0/temp/battle.json"
  ];


  const devilData = tools.combine(files)


  // Loop through the sub-objects in the JSON array
  for (const subObj of devilData.enemies) {
      // Check if the current sub-object has the desired unique identifier
      if (subObj.uniq == searchUniq) {
          // If the unique identifier is found, return the sub-object
          return subObj;
      }
  }
}


module.exports = { update, make, add2Party, devilSearch, updateHomeParty, learnSkill, summonerDevilSearch, devilLevel, summonerLevel, usrLevel, partySearch, findSummoner, talkFind};