// Require FS
const fs = require("fs");
const bundle = "custom"

function GetUrl(req, res) {
  const files = ['./json/GetUrl.json'];
  let jsonData = [];
  
  files.forEach(file => {
      const data = fs.readFileSync(file, 'utf8');
      jsonData.push(JSON.parse(data));
  });

  jsonData.push({asset_bundle_version: bundle});

  const transformedData = jsonData.reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

  res.json(transformedData);
}

module.exports = { GetUrl };