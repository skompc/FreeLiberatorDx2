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

function make(id, rarity, lvl, str, vit, mag, agi, luk, arc, skills, ai_type, dr, wk, av, spt, rp, ct, uniq, exp) {
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

function add2Party(summoner, idx, pos, uniq) {
  const data = JSON.parse(fs.readFileSync("./data/players/0/party.json"));

  var summoner_pos = data.parties.find(function (e) {
    return e.summoner == summoner;
  });

  var party_pos = summoner_pos.data.find(function (e) {
    return e.idx == idx;
  });

  party_pos.devils[pos] = uniq;

  fs.writeFileSync('./data/players/0/party.json', JSON.stringify(data, null, 2));
}

function partySearch(summoner, idx, pos) {
  const data = JSON.parse(fs.readFileSync("./data/players/0/party.json"));

  var summoner_pos = data.parties.find(function (e) {
    return e.summoner == summoner;
  });
  console.log(summoner_pos.data)

  var party_pos = summoner_pos.data.find(function (e) {
    return e.idx == idx;
  });

  return party_pos.devils[pos];

}

function devilSearch(uniq) {
  const data = JSON.parse(fs.readFileSync("./data/players/0/devils.json"));

  var devil2Return = data.devils.find(function (e) {
    console.log(uniq);
    return e.uniq == uniq;
  });

  devil2Return.pressturn = 1;

  return devil2Return;
}

function devilLevel(uniq, expGained) {
  let expArray = JSON.parse(fs.readFileSync("./json/common/exp_next.json")).exp_next;

  let devil2Return = devilSearch(uniq);

  let start_exp = devil2Return.exp;
  let start_lv = devil2Return.lv
  let expNeed = expArray[start_lv];
  let expNow = start_exp + expGained;
  console.log("exp gained: " + expGained)


  if (expNow >= expNeed) {
    devil2Return.lv = devil2Return.lv + 1;
    devil2Return.str = devil2Return.str + 1;
    devil2Return.vit = devil2Return.vit + 1;
    devil2Return.mag = devil2Return.mag + 1;
    devil2Return.agi = devil2Return.agi + 1;
    devil2Return.arc = devil2Return.arc + 1;
    devil2Return.luk = devil2Return.luk + 1;

    expNeed = expArray[devil2Return.lv + 1];

    new_devil = make(devil2Return.id, devil2Return.rarity, devil2Return.lv, devil2Return.str, devil2Return.vit, devil2Return.mag, devil2Return.agi, devil2Return.luk, devil2Return.arc, devil2Return.skl, devil2Return.ai_auto_type, devil2Return.dr, devil2Return.wk, devil2Return.av, devil2Return.spt, devil2Return.rp, devil2Return.ct, devil2Return.uniq, expNow);
    let devil2Update = [new_devil]
    update(devil2Update);
    devilLevel(uniq, expGained)
  } else {
    new_devil = make(devil2Return.id, devil2Return.rarity, devil2Return.lv, devil2Return.str, devil2Return.vit, devil2Return.mag, devil2Return.agi, devil2Return.luk, devil2Return.arc, devil2Return.skl, devil2Return.ai_auto_type, devil2Return.dr, devil2Return.wk, devil2Return.av, devil2Return.spt, devil2Return.rp, devil2Return.ct, devil2Return.uniq, expNow);
    let devil2Update = [new_devil]
    update(devil2Update);
  }

}

function updateHomeParty(id, slot) {
  const data = JSON.parse(fs.readFileSync("./data/players/0/home.json"))
  data.party[slot] = parseInt(id)
  fs.writeFileSync('./data/players/0/home.json', JSON.stringify(data, null, 2));
}

function summonerDevilSearch(id) {
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

function summonerLevel(id, exp) {
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
      while (totalExp >= expRequirement) {
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

function findSummoner(summoner_id) {
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

function usrLevel(exp) {
  const files = [
    "./data/players/0/usr.json"
  ];

  const data = tools.combine(files);
  let totalExp = data.usr["exp"]
  let expRequirement = 100 * data.usr["lv"];
  while (totalExp >= expRequirement) {
    totalExp = totalExp - expRequirement;
    expRequirement = expRequirement + 100;
    data.usr["lv"] = data.usr["lv"] + 1;
  }
  console.log(data.usr["lv"]);
  tools.addTo("./data/players/0/usr.json", "usr", data.usr);

}

function talkFind(tgt) {
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


module.exports = { update, make, add2Party, devilSearch, updateHomeParty, learnSkill, summonerDevilSearch, devilLevel, summonerLevel, usrLevel, partySearch, findSummoner, talkFind };