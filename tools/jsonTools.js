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

    fs.writeFileSync(filepath, string2Write)
}

function move (source, dest){
    
    fs.copyFileSync(source, dest)
    
}

module.exports = { combine, addTo, move };