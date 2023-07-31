function makeuniq (numChars) {
    let ID = "";
    let characters = "123456789";
    for ( var i = 0; i < numChars; i++ ) {
      ID += characters.charAt(Math.floor(Math.random() * 9));
    }
    return ID;
  }
module.exports = { makeuniq };