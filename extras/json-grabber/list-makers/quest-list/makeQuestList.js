const fs = require('fs');
const path = require('path');

let questList = []

// endpoint: Map.do
//args  _tm_=14

const input = JSON.parse(fs.readFileSync("./input.json")).dngs;

for (let i = 0; i < input.length; i++) {

    if (input[i].id == 701) {

        let parts = input[i].intermission_quest.parts;

        for (let j = 0; j < parts.length; j++) {
            
            let qsts = parts[j].qsts;
            let length = qsts.length;

            for (let k = 0; k < length; k++){

                questList.push(qsts[k].id)

            }
        }

    } else {

        let qsts = input[i].qsts;

        for (let j = 0; j < qsts.length; j++) {

            questList.push(qsts[j].id);

        }

    }

}

let data = { "quests": questList };


fs.writeFileSync('./quests.json', JSON.stringify(data, null, 2));