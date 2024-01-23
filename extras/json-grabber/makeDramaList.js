const fs = require('fs');
const path = require('path');

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

module.exports = { makeDramaList }