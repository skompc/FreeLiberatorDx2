fs = require("fs")

function combine (files){
    let jsonData = [];
    
    files.forEach(file => {
        const data = fs.readFileSync(file, "utf8");
        jsonData.push(JSON.parse(data));
    });

    const combinedData = jsonData.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});

    return combinedData
}

function addTo (filepath, param, value){
    let file = fs.readFileSync(filepath, "utf8")
    let data = JSON.parse(file)

    data[param] = value

    let string2Write = JSON.stringify(data, null, 4)

    fs.writeFileSync(filepath, string2Write)
}

function move (source, dest){
    
    fs.copyFileSync(source, dest)
    
}

function makeuniq (numChars) {
    let ID = "";
    let characters = "123456789";
    for ( var i = 0; i < numChars; i++ ) {
      ID += characters.charAt(Math.floor(Math.random() * 9));
    }
    return ID;
  }

module.exports = { combine, addTo, move, makeuniq };