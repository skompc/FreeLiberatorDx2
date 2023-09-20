const crypto = require('crypto');

function decrypt(enc) {
  const keymaterial = Buffer.from(enc.slice(0, 8), 'hex');
  const sig = Buffer.from(enc.slice(-32), 'hex');
  const encdata = Buffer.from(enc.slice(8, -32), 'hex');
  
  const key = crypto.createHash('md5').update(keymaterial).digest();
  const dec = Buffer.from(encdata.map((encb, index) => encb ^ key[index % key.length]));
  
  console.log(`decrypted: ${dec.toString()}`);

  const keyCheck = Buffer.from(crypto.createHash('md5').update(dec).digest().slice(0, 4));
  if (keymaterial.equals(keyCheck)) {
    console.log("key correct");
  } else {
    console.log("key incorrect");
  }

  const encryptKey = "__L_TMS_2D__"; // change this
  const expectedSig = crypto.createHash('md5').update(Buffer.concat([dec, Buffer.from(`${encryptKey}ABCDEFGHIJKL`.slice(2, 9) + " ")])).digest();
  if (sig.equals(expectedSig)) {
    console.log("signature correct");
  } else {
    console.log("signature incorrect");
  }
  return dec.toString()
}

function stringToJsonObject(inputString) {
    const jsonObject = {};
  
    const pairs = inputString.split('&');
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      jsonObject[key] = isNaN(value) ? value : parseFloat(value);
    }
  
    return jsonObject;
  }

module.exports = { decrypt, stringToJsonObject };