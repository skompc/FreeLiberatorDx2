// TODO: Complete game so I can grab all battle data
// TODO: Grab Tutorial Dramas
// TODO: Alterworld Stuffs
// TODO: Everything else...

// Needed variables:
// Get these from a running instance of the game (DON'T CLOSE THE GAME UNTIL SCRAPING IS DONE!)
let sid = "6B8E53CAE6BCA945542EE609C93221D5-n1";
let ek = "3JPSL2Z5TREC";

const fs = require('fs');
const path = require('path');
const encrypt = require("../../tools/decrypt").encrypt;
const axios = require('axios');
const wrapper = require('axios-cookiejar-support').wrapper;
const CookieJar = require('tough-cookie').CookieJar;
const makeDramaList = require("./makeDramaList")
const makeQuestList = require("./makeQuestList")

// Make axios instance
const jar = new CookieJar();
const client = wrapper(axios.create({
  withCredentials: true,
}));

// Make Session cookie
const cookieValue = `JSESSIONID=${sid}`;

// Set the cookie in the request headers
client.defaults.headers.common['Cookie'] = cookieValue;

// This is a function to add wait times to the scraper
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// A download function
function download(url, fileName) {
  client.get(url)
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
function getLists() {

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
  });
}

// Main function obviously
async function main() {

  // Grab the lists
  await getLists();

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

  // Reinit urlArray
  urlArray = [];

  // Make BattleEntry URLs
  for (const quest of questArray) {

    const dec0 = `stage=${quest}&main_smn=1&sub_smn=0&main_idx=1&sub_idx=0&helper=0&smn_id=0&is_auto=0&_tm_=108`;
    const enc0 = encrypt(dec0, ek);
    const url0 = `https://d2r-sim.d2megaten.com/socialsv/BattleEntry.do?param=${enc0}`;
    urlArray.push(url0);

  }

  // Fetch BattleEntry URLs
  for (let i = 0; i < questArray.length; i++) {

    let url = urlArray[i];
    let fileName = `../json/battles/story/${questArray[i]}/0.json`;

    fs.mkdir(`../json/dramas/${questArray[i]}/..`, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory: ${err.message}`);
      } else {
        console.log(`Created directory for: ${questArray[i]}`);
      }
    });

    download(url, fileName);

    await wait(5000);
  }

  // Reinit urlArray
  urlArray = [];

  // Make BattleNext URLs
  for (let i = 0; i < questArray.length; i++) {

    urlArray.push(questArray[i])
    let wave_max = JSON.parse(fs.readFileSync(`../json/battles/story/${questArray[i]}/0.json`)).wave_max;

    for (let wave = 1; wave < wave_max; wave++) {
      const dec1 = `stage=${quest}&wave=${wave}&an_info=%5b%7b%22id%22%3a+11910%2c%22attr%22%3a+127%7d%5d&item_use=&df_info=%5b%7b%22uniq%22%3a+4%2c%22type%22%3a+2%7d%5d&turn=1&p_act=0&e_act=0&_tm_=136`;
      const enc1 = encrypt(dec1, ek);
      const url1 = `https://d2r-sim.d2megaten.com/socialsv/BattleNext.do?param=${enc1}`;
      urlArray.push(url1);
    }

    urlArray.push("SPLIT")

  }

  // Split BattleNext URLs into multiple arrays
  let splitArrays = [];
  let currentArray = [];

  for (const url of urlArray) {
    if (url === "SPLIT") {
      // If "SPLIT" is encountered, push the currentArray to splitArrays
      splitArrays.push(currentArray);
      currentArray = []; // Reset the currentArray
    } else {
      // Otherwise, add the URL to the currentArray
      currentArray.push(url);
    }
  }

  if (currentArray.length > 0) {
    splitArrays.push(currentArray);
  }

  // Fetch BattleNext URLs
  for (let i = 0; i < splitArrays.length; i++) {

    let newCurrentArray = splitArrays[i];
    

    download(url, fileName);

    await wait(5000);
  }

}


main();