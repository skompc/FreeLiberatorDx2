const fs = require('fs');

let myArray = JSON.parse(fs.readFileSync("./quests.json")).quests;

myArray.sort((a, b) => {
    const lastDigitA = String(a).slice(-1);
    const lastDigitB = String(b).slice(-1);

    return lastDigitA.localeCompare(lastDigitB);
});

myArray = myArray.filter(number => String(number).length <= 5);


let data = { "quests": myArray };


fs.writeFileSync('./quests_filtered.json', JSON.stringify(data, null, 2));

console.log(myArray);
