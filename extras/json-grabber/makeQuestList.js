const fs = require('fs');
const path = require('path');

function makeQuestList(){

let questList = []

// endpoint: Map.do
//args  _tm_=14

const input = JSON.parse(fs.readFileSync("./Map.json")).dngs;

for (let i = 0; i < input.length; i++) {

    if (input[i].id == 701) {

        let parts = input[i].intermission_quest.parts;

        for (let j = 0; j < parts.length; j++) {

            let qsts = parts[j].qsts;
            let length = qsts.length;

            for (let k = 0; k < length; k++) {

                questList.push(qsts[k].id)
                console.log(`Added Intermission Quest ${qsts[k].id}`)

            }
        }

    } else if (input[i].id == 901) {
        let chara_quest = input[i].chara_quest;

        for (let j = 0; j < chara_quest.length; j++) {

            let qsts = chara_quest[j].qsts;
            let length = qsts.length;

            for (let k = 0; k < length; k++) {

                questList.push(qsts[k].id)
                console.log(`Added Dx2 Quest ${qsts[k].id}`)

            }
        }
    } else {

        let qsts = input[i].qsts;

        for (let j = 0; j < qsts.length; j++) {

            questList.push(qsts[j].id);
            console.log(`Added Story Quest ${qsts[j].id}`)

        }

    }

}

let data = { "quests": questList };


fs.writeFileSync('./quests.json', JSON.stringify(data, null, 2));
}

module.exports = { makeQuestList }