fs = require("fs")

function combine (files){
    let jsonData = [];
    
    files.forEach(file => {
        const data = fs.readFileSync(file, "utf8");
        jsonData.push(JSON.parse(data));
    });

    const transformedData = jsonData.reduce((acc, curr) => {
        return { ...acc, ...curr };
      }, {});
    
    const combinedData = JSON.stringify(transformedData, null, 4);

    return combinedData
}

function addTo (filepath, param, value){
    let file = fs.readFileSync(filepath, "utf8")
    let data = JSON.parse(file)

    data[param] = value

    let string2Write = JSON.stringify(data, null, 4)

    fs.writeFileSync(string2Write, filepath)
}

function move (oldfile, newfile){
    let file = fs.readfileSync(oldfile, "utf8")
    let data = JSON.parse(file)
    fs.writeFileSync(JSON.stringify(data, null, 4))
}

module.exports = { combine, addTo, move };