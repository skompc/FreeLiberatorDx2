const fs = require('fs');
const path = require('path');
const encrypt = require("../../tools/decrypt").encrypt;
const axios = require('axios');
const wrapper = require('axios-cookiejar-support').wrapper;
const CookieJar = require('tough-cookie').CookieJar;
const makeQuestList = require("../json-grabber/makeQuestList")

let check_code = JSON.parse(fs.readFileSync("./config.json")).check_code;
let account = JSON.parse(fs.readFileSync("./config.json")).account;
let uuid = JSON.parse(fs.readFileSync("./config.json")).uuid;
let secure_id = JSON.parse(fs.readFileSync("./config.json")).secure_id;
let ek;
let sid;

let client = wrapper(axios.create({
    withCredentials: true,
}));

function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function SetCookies(sid) {
    return new Promise(() => {
        let cookieValue = `JSESSIONID=${sid}`;
        client.defaults.headers.common['Cookie'] = cookieValue;
    });
}

async function main() {

    let options = {
        headers: {
            "user-agent": "SEGA Web Client for D2SMTL 2018",
            "X-Unity-Version": "2021.3.23f1"
        }
    }
    let url = `https://d2r-sim.d2megaten.com/socialsv/common/GetUrl.do?check_code=${check_code}&platform=2&lang=1&bundle_id=com.sega.d2megaten.en&_tm_=1`;

    let BundleVer = client.get(url, options)
        .then(response => {
            const data = response.data;
            return data.asset_bundle_version
        });

    let enc = `account=${account}&uuid=${uuid}&secure_id=${secure_id}&check_code=${check_code}&lang=1&platform=2&country=US&asset_bundle_version=${BundleVer}&bundle_id=com.sega.d2megaten.en&coppa=0&_tm_=5`
    let LoginParam = encrypt(enc, "__L_TMS_2D__")
    url = `https://d2r-sim.d2megaten.com/socialsv/Login.do?param=${LoginParam}`;

    let LoginResponse = await client.get(url, options)
        .then(response => {
            const data = response.data;
            return data
        });

    ek = LoginResponse.ek;
    sid = LoginResponse.sid;

    await SetCookies(sid);

}

function makeAccount(){
    return new Promise((resolve) => {
        const enc = "platform=2&country=US&lang=1&bundle_id=com.sega.d2megaten.en&coppa=0&_tm_=4";
        let RegistParam = encrypt(enc, "__L_TMS_2D__");

    })
}

main();
