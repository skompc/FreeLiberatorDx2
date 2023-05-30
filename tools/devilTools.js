function update(input) {
  const data = JSON.parse(fs.readFileSync("./data/players/0/devils.json"))
  const devilsOwned = data.devils;
  const devils2Add = input;

  devils2Add.forEach((object1) => {
    const index = devilsOwned.findIndex((object2) => object2.uniq === object1.uniq);  
      if (index !== -1) {
        devilsOwned[index] = object1;
      } else {
        devilsOwned.push(object1);
      }
  });

  data["devils"] = devilsOwned;
  data["devil_num"] = devilsOwned.length;
  let file2Write = JSON.stringify(data, null, 4);
  fs.writeFileSync("./data/players/0/devils.json", file2Write);
}

function make(id){
  
}

module.exports = { update };