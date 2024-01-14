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

    let BundleVer = client.get(url,options)
       .then(response => {
           const data = response.data;
           console.log(data.asset_bundle_version)
           return data.asset_bundle_version
       });

    //let enc = `account=${account}&uuid=${uuid}&secure_id=${secure_id}&check_code=${check_code}p&lang=1&platform=2&country=US&asset_bundle_version=6.3.0.M7HZLBE9HzsY&bundle_id=com.sega.d2megaten.en&coppa=0&_tm_=5`
    //let LoginParam = encrypt(enc, "__L_TMS_2D__")
    //url = `https://d2r-sim.d2megaten.com/socialsv/Login.do?param=bc540fe89b419f42bc687dde2427eca814c6e555c368ac1eef737c8a054cd9a930f7cb779c608f6e833450d2563ed5a86ecace6b9e109d1dab6f31d40b4995e331c99956bc61da5eac657c91042ec4ff64d59a28bf67b868fa443ea52544e9ac1ca09b54bb16ba14f83248d75543e8a21fb6ca799f419772aa696d865c4783a877a0993fbd46af4aae694cb15519ebeb7ffcc87f9d1fcd0bb96a6897071edff664a28f7295579259bb7f34b63257cce82af5dd4e98579249a56356950403def236fe9427d411d21de74b3eab3b3defde60d8d362a3049e58a76265863e18c9a63affc43f89479b4ce7623b8e0416ccef3cfe877494049f42b97668de5157f2ef34cf9425b67a4b0e9f9d8985a0a5e8274aad2a42`;

    //let LoginResponse = await client.get(url)
    //  .then(response => {
    //    const data = response.data;
    //  return data
    //});

    //ek = LoginResponse.ek;
    //sid = LoginResponse.sid;
    //await SetCookies(sid);

}


main();
