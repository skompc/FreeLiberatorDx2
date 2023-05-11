const fs = require('fs');
const axios = require('axios');
const path = require('path');

const initialUrl = 'https://d2r-sim.d2megaten.com/socialsv/common/GetUrl.do?check_code=6.1.01.TLP3AAGyyAGF&platform=2&lang=1&bundle_id=com.sega.d2megaten.en&_tm_=1';

async function downloadFiles() {
  try {
    const initialResponse = await axios.get(initialUrl);
    const { asset_bundle_url, asset_bundle_version } = initialResponse.data;
    const baseUrl = `${asset_bundle_url}Android/${asset_bundle_version}/en/`;
    const filename = 'ab_list.txt';

    const dir = `./contents/Android/${asset_bundle_version}/en/`;
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
  const fileUrl = baseUrl + filename;
  const fileResponse = await axios.get(fileUrl);
  const data = fileResponse.data;
  const filePath0 = path.join(dir, `${filename}`);
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
        console.log("Done downloading all files!")
      }
    }
  }
}

downloadFiles();
