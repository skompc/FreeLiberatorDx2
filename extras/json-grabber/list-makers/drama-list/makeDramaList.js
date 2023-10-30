const fs = require('fs');
const path = require('path');

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

const input = JSON.parse(fs.readFileSync("./input.json")).dramas;

for (let i = 0; i < input.length; i++){
    let list = input[i].list;
    for (let j = 0; j < list.length; j++){
        dramaList.push(list[j].drm);
    }
}

let data = {"dramas": dramaList};


fs.writeFileSync('./dramas.json', JSON.stringify(data, null, 2));