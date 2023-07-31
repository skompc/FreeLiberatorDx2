function blank(req, res) {
    res.status(200).json({res_code:0, client_wait:0})
}

function makeuniq (numChars) {
    let ID = "";
    let characters = "123456789";
    for ( var i = 0; i < numChars; i++ ) {
      ID += characters.charAt(Math.floor(Math.random() * 9));
    }
    return ID;
  }
module.exports = { blank, makeuniq };