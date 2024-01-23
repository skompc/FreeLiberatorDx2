const fs = require('fs');
const path = require('path');
const encrypt = require("../../tools/decrypt").encrypt;
const axios = require('axios');
const wrapper = require('axios-cookiejar-support').wrapper;
const qs = require('querystring');

const utils = require("./utils");

let check_code = JSON.parse(fs.readFileSync("./config.json")).check_code;
let account = JSON.parse(fs.readFileSync("./config.json")).account;
let uuid = JSON.parse(fs.readFileSync("./config.json")).uuid;
let secure_id = JSON.parse(fs.readFileSync("./config.json")).secure_id;
let ek;
let sid;
let _tm_ = 0;

let enemy_array = [];
let enemyHP_array = [];

let client = wrapper(axios.create({
    withCredentials: true,
}));

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function SetCookies(sid) {
    let cookieValue = `JSESSIONID=${sid}`;
    client.defaults.headers.common['Cookie'] = cookieValue;
}

async function GetUrlSync() {
    let options = {
        headers: {
            "user-agent": "SEGA Web Client for D2SMTL 2018",
            "X-Unity-Version": "2021.3.23f1"
        }
    };

    let url = `https://d2r-sim.d2megaten.com/socialsv/common/GetUrl.do?check_code=${check_code}&platform=2&lang=1&bundle_id=com.sega.d2megaten.en&_tm_=1`;

    try {
        const response = await client.get(url, options);
        //console.log("GetUrlSync response:", response);

        if (response && response.data && response.data.asset_bundle_version) {
            return response.data.asset_bundle_version;
        } else {
            //console.error("GetUrlSync: Unexpected response format:", response);
            throw new Error("Unexpected response format");
        }
    } catch (error) {
        //console.error("GetUrlSync error:", error);
        throw error;
    }
}

async function LoginSync(asset_bundle_version) {
    let options = {
        headers: {
            "user-agent": "SEGA Web Client for D2SMTL 2018",
            "X-Unity-Version": "2021.3.23f1"
        }
    };

    let enc = `account=${account}&uuid=${uuid}&secure_id=${secure_id}&check_code=${check_code}&lang=1&platform=2&country=US&asset_bundle_version=${asset_bundle_version}&bundle_id=com.sega.d2megaten.en&coppa=0&_tm_=5`;
    let LoginParam = encrypt(enc, "__L_TMS_2D__");
    url = `https://d2r-sim.d2megaten.com/socialsv/Login.do?param=${LoginParam}`;

    try {
        const response = await client.get(url, options);
        //console.log("LoginSync response:", response);
        return response.data;
    } catch (error) {
        //console.error("LoginSync error:", error);
        throw error;
    }
}

async function BattleEntrySync(stage, ek) {
    const enc = `stage=${stage}&main_smn=1&sub_smn=0&main_idx=1&sub_idx=0&helper=0&smn_id=0&is_auto=0&_tm_=21`;
    let BattleEntryParam = encrypt(enc, ek);
    let url = `https://d2r-sim.d2megaten.com/socialsv/BattleEntry.do?param=${BattleEntryParam}`;

    let options = {
        headers: {
            "user-agent": "SEGA Web Client for D2SMTL 2018",
            "X-Unity-Version": "2021.3.23f1"
        }
    };

    try {
        const response = await client.get(url, options);
        //console.log("BattleEntrySync response:", response);
        return response.data;
    } catch (error) {
        //console.error("BattleEntrySync error:", error);
        throw error;
    }
}

async function BattleNextSync(stage, wave, ek) {
    const enc = `stage=${stage}&wave=${wave}&an_info=&item_use=&df_info=&turn=1&p_act=1&e_act=0&_tm_=26`;
    let BattleNextParam = encrypt(enc, ek);
    let url = `https://d2r-sim.d2megaten.com/socialsv/BattleNext.do?param=${BattleNextParam}`;

    let options = {
        headers: {
            "user-agent": "SEGA Web Client for D2SMTL 2018",
            "X-Unity-Version": "2021.3.23f1"
        }
    };

    try {
        const response = await client.get(url, options);
        console.log("BattleNextSync response:", response.data);
        return response.data;
    } catch (error) {
        //console.error("BattleNextSync error:", error);
        throw error;
    }
}

async function BattleResultSync(stage, BattleResultInput, ek) {
    const enc = `stage=${stage}&result=1&an_info=&item_use=&df_info=&mission_result=0&defeat_count=3&smn_change=1&max_damage=71&turn=1&p_act=1&e_act=0&mem_cnt=0&dtcr_err=0&mem_log=&clear_tm=51536&info=${BattleResultInput}&_tm_=65`;
    let BattleResultParam = encrypt(enc, ek);
    let url = `https://d2r-sim.d2megaten.com/socialsv/BattleResult.do`;

    const data = {
        param: BattleResultParam
    };

    let options = {
        headers: {
            "user-agent": "SEGA Web Client for D2SMTL 2018",
            "X-Unity-Version": "2021.3.23f1",
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    try {
        const response = await client.post(url, qs.stringify(data), options);
        //console.log("BattleResultSync response:", response);
        return response.data;
    } catch (error) {
        //console.error("BattleResultSync error:", error);
        throw error;
    }
}

async function BattleNextWrapperSync(stage, wave_max, ek) {
    let wave = 1;

    async function processNextWave() {
        //console.log(`wave: ${wave}`);
        try {
            const response = await BattleNextSync(stage, wave, ek);
            //console.log(response.enemies)
            let enemies2Add = utils.arrayPick(response.enemies, "uniq");
            let enemiesHp2Add = utils.arrayPick(response.enemies, "hp");

            enemy_array = enemy_array.concat(enemies2Add);
            enemyHP_array = enemyHP_array.concat(enemiesHp2Add);

            wave++;
            if (wave < wave_max) {
                return processNextWave();
            } else {
                return 0;
            }
        } catch (error) {
            throw error;
        }
    }

    return processNextWave();
}

async function PlayQuestSync(stage, ek) {
    console.log(`playing ${stage}`);
    enemy_array = [];
    enemyHP_array = [];

    try {
        const Step1 = await BattleEntrySync(stage, ek);
        //console.log(Step1.parties);

        let party_array = utils.arrayPick(Step1.parties[0].devils, "uniq");
        let partyHP_array = utils.arrayPick(Step1.parties[0].devils, "hp");
        let enemies2Add = utils.arrayPick(Step1.enemies, "uniq");
        let enemiesHp2Add = utils.arrayPick(Step1.enemies, "hp");

        enemy_array = enemy_array.concat(enemies2Add);
        enemyHP_array = enemyHP_array.concat(enemiesHp2Add);

        const Step2 = await BattleNextWrapperSync(stage, Step1.wave_max, ek);
        let enemyHP = utils.sumArray(enemyHP_array);
        let BattleResultInput = utils.build_devil_info(party_array, partyHP_array, enemy_array, enemyHP);

        return await BattleResultSync(stage, BattleResultInput, ek);
    } catch (error) {
        throw error;
    }
}

async function mainSync() {
    try {
        const asset_bundle_version = await GetUrlSync();
        const LoginResponse = await LoginSync(asset_bundle_version);

        ek = LoginResponse.ek;
        sid = LoginResponse.sid;

        SetCookies(sid);

        let questArray = JSON.parse(fs.readFileSync("./quests_filtered.json")).quests;

        for (const number of questArray) {
            const thirdDigit = Number(String(number)[2]);
            const fourthDigit = Number(String(number)[3]);

            if (thirdDigit === 0 && fourthDigit === 0) {
                console.log(`playing drama${number}`);
                let enc = `quest_id=${number}&_tm_=18`;

                let BattleNextParam = encrypt(enc, ek);
                let url = `https://d2r-sim.d2megaten.com/socialsv/BattleNext.do?param=${BattleNextParam}`;

                let options = {
                    headers: {
                        "user-agent": "SEGA Web Client for D2SMTL 2018",
                        "X-Unity-Version": "2021.3.23f1"
                    }
                };

                await client.get(url, options);
            } else {
                await PlayQuestSync(number, ek);
                await wait(5000);
            }
        }

        // Uncomment the following line if you want to add autoBattle logic
        // autoBattle(questArray, ek);

        // Uncomment the following block if you want to loop through questArray asynchronously
        /*
        for (const quest of questArray) {
            const a = await PlayQuestSync(quest, ek);
            console.log(quest);
            console.log(a);
        }
        */
    } catch (error) {
        console.error(error);
    }
}

// Uncomment the following line if you want to execute the main function
mainSync();
