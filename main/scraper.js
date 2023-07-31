const fs = require('fs');
const axios = require('axios');
const path = require('path');

const check_code = "6.2.10.dMCnif3QPwuS" //obtained from legit app request
const lang_code = "en" //language to download
const platform = "Android" // Android for now... I don't know the correct url for apple devices.

const initialUrl = `https://d2r-sim.d2megaten.com/socialsv/common/GetUrl.do?check_code=${check_code}&platform=2&lang=1&bundle_id=com.sega.d2megaten.en&_tm_=1`;

async function downloadFiles() {
  try {
    const initialResponse = await axios.get(initialUrl);
    const { asset_bundle_url, asset_bundle_version } = initialResponse.data;
    const baseUrl = `${asset_bundle_url}${platform}/${asset_bundle_version}/${lang_code}/`;
    const filename = 'ab_list.txt';

    const dir = `./contents/${platform}/${asset_bundle_version}/${lang_code}/`;
    fs.mkdir(dir+"assets/", { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory: ${err.message}`);
      } else {
        console.log(`Created directory: ${dir}`);
        downloadFile(dir, baseUrl, filename);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

async function downloadFile(dir, baseUrl, filename) {
  const newFileName = filename.replace(/ /g, "%20");
  const fileUrl = baseUrl + filename;
  const fileResponse = await axios.get(fileUrl);
  const data = fileResponse.data;
  const filePath0 = path.join(dir, `${newFileName}`);
  fs.writeFileSync(filePath0, data);
  console.log(`Downloaded ${filename} to ${filePath0}`);

  const lines = data.replace(/\t/g, '|').trim().split('\n');
  lines.shift();
  for (const line of lines) {
    const words = line.trim().split('|');
    const firstWord = words[0];
    const filePath = path.join(dir, `assets/${firstWord}`);

    if (fs.existsSync(filePath)) {
      console.log(`${filePath} already exists, skipping download`);
    } else {
        if (firstWord != "[EOF]"){
        const url = baseUrl + "assets/" + firstWord;
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const fileContents = response.data;
        fs.writeFileSync(filePath, fileContents);
        console.log(`Downloaded ${url} to ${filePath}`);
      } else {
        const filePath2 = path.join(dir, `assets/ab.txt`);
        const url = baseUrl + "assets/ab.txt";
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const fileContents = response.data;
        fs.writeFileSync(filePath2, fileContents);
        console.log(`Downloaded ${url} to ${filePath2}`);
        console.log("Done downloading all files!")
      }
    }
  }
}

downloadFiles();
