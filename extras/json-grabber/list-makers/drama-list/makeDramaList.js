const fs = require('fs');
const path = require('path');

let dramaList = []

const input = JSON.parse(fs.readFileSync("./input.json")).dramas;

for (let i = 0; i < input.length; i++){
    let list = input[i].list;
    for (let j = 0; j < list.length; j++){
        dramaList.push(list[j].drm);
    }
}

let data = {"dramas": dramaList};


fs.writeFileSync('./dramas.json', JSON.stringify(data, null, 2));