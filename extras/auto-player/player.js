const fs = require('fs');
const path = require('path');
const encrypt = require("../../tools/decrypt").encrypt;
const axios = require('axios');
const wrapper = require('axios-cookiejar-support').wrapper;
const qs = require('querystring');

const utils = require("./utils")

let check_code = JSON.parse(fs.readFileSync("./config.json")).check_code;
let account = JSON.parse(fs.readFileSync("./config.json")).account;
let uuid = JSON.parse(fs.readFileSync("./config.json")).uuid;
let secure_id = JSON.parse(fs.readFileSync("./config.json")).secure_id;
let ek;
let sid;
let _tm_ = 0;

let enemy_array = []

let enemyHP_array = [];

let client = wrapper(axios.create({
    withCredentials: true,
}));

function wait(milliseconds) {
    const start = new Date().getTime();
    let current;
  
    do {
      current = new Date().getTime();
    } while (current - start < milliseconds);
  }

async function SetCookies(sid) {
    let cookieValue = `JSESSIONID=${sid}`;
    client.defaults.headers.common['Cookie'] = cookieValue;
}

async function GetUrl() {
    let options = {
        headers: {
            "user-agent": "SEGA Web Client for D2SMTL 2018",
            "X-Unity-Version": "2021.3.23f1"
        }
    }

    let url = `https://d2r-sim.d2megaten.com/socialsv/common/GetUrl.do?check_code=${check_code}&platform=2&lang=1&bundle_id=com.sega.d2megaten.en&_tm_=1`;

    let Response = client.get(url, options).then(response => {
        const data = response.data;
        return data.asset_bundle_version
    });

    return Response;
}

async function Login(asset_bundle_version) {

    let options = {
        headers: {
            "user-agent": "SEGA Web Client for D2SMTL 2018",
            "X-Unity-Version": "2021.3.23f1"
        }
    }

    let enc = `account=${account}&uuid=${uuid}&secure_id=${secure_id}&check_code=${check_code}&lang=1&platform=2&country=US&asset_bundle_version=${asset_bundle_version}&bundle_id=com.sega.d2megaten.en&coppa=0&_tm_=5`
    let LoginParam = encrypt(enc, "__L_TMS_2D__")
    url = `https://d2r-sim.d2megaten.com/socialsv/Login.do?param=${LoginParam}`;

    let Response = await client.get(url, options).then(response => {
        const data = response.data;
        return data
    });

    return Response
}

async function BattleEntry(stage, ek) {
    const enc = `stage=${stage}&main_smn=1&sub_smn=0&main_idx=1&sub_idx=0&helper=0&smn_id=0&is_auto=0&_tm_=21`
    let BattleEntryParam = encrypt(enc, ek);
    let url = `https://d2r-sim.d2megaten.com/socialsv/BattleEntry.do?param=${BattleEntryParam}`;

    let options = {
        headers: {
            "user-agent": "SEGA Web Client for D2SMTL 2018",
            "X-Unity-Version": "2021.3.23f1"
        }
    }

    let Response = await client.get(url, options).then(response => {
        const data = response.data;
        console.log(data)
        return data
    });

    return Response;
}

async function BattleNext(stage, wave, ek) {
    const enc = `stage=${stage}&wave=${wave}&an_info=&item_use=&df_info=&turn=1&p_act=1&e_act=0&_tm_=26`
    let BattleNextParam = encrypt(enc, ek);
    let url = `https://d2r-sim.d2megaten.com/socialsv/BattleNext.do?param=${BattleNextParam}`;

    let options = {
        headers: {
            "user-agent": "SEGA Web Client for D2SMTL 2018",
            "X-Unity-Version": "2021.3.23f1"
        }
    }

    let Response = await client.get(url, options).then(response => {
        const data = response.data;
        return data
    });

    return Response;
}

async function BattleResult(stage, BattleResultInput, ek) {

    const enc = `stage=${stage}&result=1&an_info=&item_use=&df_info=&mission_result=0&defeat_count=3&smn_change=1&max_damage=71&turn=1&p_act=1&e_act=0&mem_cnt=0&dtcr_err=0&mem_log=&clear_tm=51536&info=${BattleResultInput}&_tm_=65`;
    let BattleResultParam = encrypt(enc, ek);
    let url = `https://d2r-sim.d2megaten.com/socialsv/BattleResult.do`;

    const data = {
        param: BattleResultParam
    }

    let options = {
        headers: {
            "user-agent": "SEGA Web Client for D2SMTL 2018",
            "X-Unity-Version": "2021.3.23f1",
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    let Response = await client.post(url, qs.stringify(data), options).then(res => {
        return res.data;
    })

    return Response
}

async function main() {

    let asset_bundle_version = await GetUrl();

    let LoginResponse = await Login(asset_bundle_version);

    ek = LoginResponse.ek;
    sid = LoginResponse.sid;

    await SetCookies(sid);

    let questArray = JSON.parse(fs.readFileSync("./quests_filtered.json")).quests;

    questArray.forEach(number => {
        const thirdDigit = Number(String(number)[2]);
        const fourthDigit = Number(String(number)[3]);

        if (thirdDigit === 0 && fourthDigit === 0) {
            // Do something for numbers with 0 in the third and fourth digits
            console.log(`playing drama${number}`)
            let enc = `quest_id=${number}&_tm_=18`

            let BattleNextParam = encrypt(enc, ek);
            let url = `https://d2r-sim.d2megaten.com/socialsv/BattleNext.do?param=${BattleNextParam}`;
        
            let options = {
                headers: {
                    "user-agent": "SEGA Web Client for D2SMTL 2018",
                    "X-Unity-Version": "2021.3.23f1"
                }
            }
        
            let Response = client.get(url, options).then(response => {
                const data = response.data;
                return data
            });



        } else {
            // Do something else for other numbers
            PlayQuest(number, ek)
            wait(5000)
        }
    })
    //autoBattle(questArray, ek)

    //let aa =await PlayQuest(10091,ek)

    //console.log(aa)
/*
    for (quest in questArray) {
        let a = await PlayQuest(questArray[quest], ek)
        console.log(questArray[quest])
        console.log(a)
    }
    */
}

async function PlayQuest(stage, ek) {

    console.log(`playing ${stage}`)
    enemy_array = [];

    enemyHP_array = [];

    let Step1 = await BattleEntry(stage, ek);

    console.log(Step1.parties)

    let party_array = await utils.arrayPick(Step1.parties[0].devils, "uniq")

    let partyHP_array = await utils.arrayPick(Step1.parties[0].devils, "hp")

    let enemies2Add = await utils.arrayPick(Step1.enemies, "uniq");

    let enemiesHp2Add = await utils.arrayPick(Step1.enemies, "hp");

    enemy_array = enemy_array.concat(enemies2Add);

    enemyHP_array = enemyHP_array.concat(enemiesHp2Add);

    let Step2 = await BattleNextWrapper(stage, Step1.wave_max, ek)

    let enemyHP = utils.sumArray(enemyHP_array);

    let BattleResultInput = utils.build_devil_info(party_array, partyHP_array, enemy_array, enemyHP);

    let Step3 = await BattleResult(stage, BattleResultInput, ek)

    return Step3
}

async function BattleNextWrapper(stage, wave_max, ek) {
    for (let wave = 1; wave < wave_max; wave++) {
        console.log(`wave: ${wave}`)
        let response = await BattleNext(stage, wave, ek)

        let enemies2Add = await utils.arrayPick(response.enemies, "uniq")
        let enemiesHp2Add = await utils.arrayPick(response.enemies, "hp");

        enemy_array = enemy_array.concat(enemies2Add);
        enemyHP_array = enemyHP_array.concat(enemiesHp2Add);
    }
    return 0;
}

main();
