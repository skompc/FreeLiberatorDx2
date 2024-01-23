// TODO: Complete game so I can grab all battle data
// TODO: Grab Tutorial Dramas
// TODO: Alterworld Stuffs
// TODO: Everything else...

const fs = require('fs');
const path = require('path');
const encrypt = require("../../tools/decrypt").encrypt;
const axios = require('axios');
const wrapper = require('axios-cookiejar-support').wrapper;
const CookieJar = require('tough-cookie').CookieJar;

let check_code = JSON.parse(fs.readFileSync("./config.json")).check_code;
let account = JSON.parse(fs.readFileSync("./config.json")).account;
let uuid = JSON.parse(fs.readFileSync("./config.json")).uuid;
let secure_id = JSON.parse(fs.readFileSync("./config.json")).secure_id;
let ek;
let sid;

// Make axios instance
const jar = new CookieJar();
const client = wrapper(axios.create({
  withCredentials: true,
}));

// This is a function to add wait times to the scraper
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// This function grabs some important value before login
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

// This function actually logs in.
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

// A download function
function download(url, fileName) {
  let options = {
    headers: {
      "user-agent": "SEGA Web Client for D2SMTL 2018",
      "X-Unity-Version": "2021.3.23f1"
    }
  }

  client.get(url, options)
    .then(response => {
      const jsonData = response.data;

      fs.writeFile(fileName, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) throw err;
        console.log(`JSON data saved to ${fileName}`);
        let check = JSON.parse(fs.readFileSync(`./${fileName}`))
        if (check.res_code != 0) {
          console.log(`File ${fileName} not valid... retrying`);
          download(url, fileName);
        }
      });
    })
}

// Fetch List-Making URLs
async function getLists(ek) {

  // Gotta make sure this function finishes BEFORE the caller's next line is run
  return new Promise((resolve) => {

    // For Quest List
    let dec = `_tm_=14`;
    let enc = encrypt(dec, ek);
    let url = `https://d2r-sim.d2megaten.com/socialsv/Map.do?param=${enc}`;
    download(url, "./Map.json")

    // For Drama Lists
    for (let i = 1; i < 9; i++) {

      let dec1 = `id=${i}&_tm_=55`;
      let enc1 = encrypt(dec1, ek);
      let url1 = `https://d2r-sim.d2megaten.com/socialsv/ReadBack.do?param=${enc1}`;
      download(url1, `./${i}.json`)

    }
    return resolve()
  });
}

// Main function obviously
async function main() {

  let asset_bundle_version = await GetUrl();

  let LoginResponse = await Login(asset_bundle_version);

  // Make Session cookie
  const cookieValue = `JSESSIONID=${LoginResponse.sid}`;

  // Set the cookie in the request headers
  client.defaults.headers.common['Cookie'] = cookieValue;

  let ek = LoginResponse.ek;

  // Grab the lists
  getLists(ek);
  makeDramaList();
  makeQuestList();




  // Quest ids
  let questArray = JSON.parse(fs.readFileSync("./quests.json")).quests;

  // Drama paths
  let dramaArray = JSON.parse(fs.readFileSync("./dramas.json")).dramas;

  // Init empty array
  let urlArray = [];

  //  Make Drama URLs
  for (const drama of dramaArray) {

    const dramaToGet = encodeURIComponent(drama);
    const encodedUrl = dramaToGet.replace(/\//g, '%2f');
    const dec = `lang=1&path=${encodedUrl}&_tm_=8`;
    const enc = encrypt(dec, ek);
    const url = `https://d2r-sim.d2megaten.com/socialsv/Drama.do?param=${enc}`;
    urlArray.push(url);
    console.log(`pushed: ${url}`);

  }

  // Fetch Drama URLs
  for (let i = 0; i < dramaArray.length; i++) {

    let url = urlArray[i];
    let fileName = `../json/dramas/${dramaArray[i]}.json`;

    fs.mkdir(`../json/dramas/${dramaArray[i]}/..`, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory: ${err.message}`);
      } else {
        console.log(`Created directory for: ${dramaArray[i]}`);
      }
    });

    download(url, fileName);

    await wait(5000);
  }



}

async function makeQuestList() {

  return new Promise((resolve) => {

    let questList = []

    // endpoint: Map.do
    //args  _tm_=14

    const input = JSON.parse(fs.readFileSync("./Map.json")).dngs;

    for (let i = 0; i < input.length; i++) {

      if (input[i].id == 701) {

        let parts = input[i].intermission_quest.parts;

        for (let j = 0; j < parts.length; j++) {

          let qsts = parts[j].qsts;
          let length = qsts.length;

          for (let k = 0; k < length; k++) {

            questList.push(qsts[k].id)
            console.log(`Added Intermission Quest ${qsts[k].id}`)

          }
        }

      } else if (input[i].id == 901) {
        let chara_quest = input[i].chara_quest;

        for (let j = 0; j < chara_quest.length; j++) {

          let qsts = chara_quest[j].qsts;
          let length = qsts.length;

          for (let k = 0; k < length; k++) {

            questList.push(qsts[k].id)
            console.log(`Added Dx2 Quest ${qsts[k].id}`)

          }
        }
      } else {

        let qsts = input[i].qsts;

        for (let j = 0; j < qsts.length; j++) {

          questList.push(qsts[j].id);
          console.log(`Added Story Quest ${qsts[j].id}`)

        }

      }

    }

    let data = { "quests": questList };


    fs.writeFileSync('./quests.json', JSON.stringify(data, null, 2));

    return resolve()

  });
}

async function makeDramaList() {

  return new Promise((resolve) => {
    let dramaList = []

    // Endpoint: ReadBack.do
    // Main Story 1 Args: id=1&_tm_=55
    // Main Story Intermission Args: id=6&_tm_=55
    // Main Story 2 Args: id=7&_tm_=55
    // Aura Gate Args: id=2&_tm_=55
    // Alter-World Args: id=8&_tm_=55
    // Dx2 Args: id=3&_tm_=55
    // Events Args: id=5&_tm_=55
    // Tutorial Args: id=4&_tm_=55

    let input = []

    for (let i = 1; i < 9; i++) {
      console.log(i)
      input.push(fs.readFileSync(`./${i}.json`, "utf-8"))
    }

    let array2Json = `{"input": [${input}]}`

    let data0 = JSON.parse(array2Json);


    fs.writeFileSync('./dramaInput.json', JSON.stringify(data0, null, 2));



    for (let i = 0; i < data0.input.length; i++) {
      let list = data0.input[i].list;

      for (let j = 0; j < list.length; j++) {
        dramaList.push(list[j].drm);
      }
    }

    let data = { "dramas": dramaList };


    fs.writeFileSync('./dramas.json', JSON.stringify(data, null, 2));

    return resolve();
  });
}


main();