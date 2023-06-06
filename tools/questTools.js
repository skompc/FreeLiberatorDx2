fs = require("fs")

function updateObjectById(array, id, updatedProperties) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id == id) {
        Object.assign(array[i], updatedProperties); // Update the desired properties
        return true; // Return true if object is found and updated
      }
    }
    return false; // Return false if no object with matching ID is found
  }

function splitNumber(number) {
    var numberString = number.toString();
    
    if (numberString.length !== 5) {
      // Handle invalid input
      console.log("Invalid number. Please provide a 5-digit number.");
      return;
    }
    
    var first = numberString.slice(0,1);
    var second = numberString.slice(1,2);
    var third = numberString.slice(2,3);
    var fourth = numberString.slice(3,4);
    var fifth = numberString.slice(4);
    
    var result = [first, second, third, fourth, fifth];
    return result;
  }

function updateQuests(quest){
    let qa = splitNumber(quest)
    let file = fs.readFileSync("./data/players/0/map.json", "utf8");
    let data = JSON.parse(file);
    let qsts = data.dngs[parseInt(`${qa[0]}${qa[1]}`) - 10].qsts
    updateObjectById(qsts, quest, {is_clear: true})
    let q3 = parseInt(qa[3])+1
    if (q3 < 10){
      let quest2 = `${qa[0]}${(qa[1])}${qa[2]}${q3}${qa[4]}`
      console.log(quest2)
      updateObjectById(qsts, quest2, {is_opn: true, is_lck: false})
    } else {
      let quest2 = `${qa[0]}${(qa[1])}${parseInt(qa[2])+1}0${qa[4]}`
      console.log(quest2)
      updateObjectById(qsts, quest2, {is_opn: true, is_lck: false})
    }
    if (qa[4] < 3){
      let q4 = parseInt(qa[4])+1
        let quest3 = `${qa[0]}${(qa[1])}${qa[2]}${qa[3]}${q4}`
        updateObjectById(qsts, quest3, {is_opn: true, is_lck: false})
    }
    let string2Write = JSON.stringify(data, null, 4)

    fs.writeFileSync("./data/players/0/map.json", string2Write)
}

module.exports = { updateQuests};