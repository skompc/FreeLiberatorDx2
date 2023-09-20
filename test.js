// Anything that is commented out is code that deals with signature verification
// which isn't really needed, but still a nice-to-have
// so that's why it's still included in the file

const crypto = require('crypto');

function decrypt(enc) {
  const keymaterial = Buffer.from(enc.slice(0, 8), 'hex');
  //const sig = Buffer.from(enc.slice(-32), 'hex');
  const encdata = Buffer.from(enc.slice(8, -32), 'hex');
  
  const key = crypto.createHash('md5').update(keymaterial).digest();
  const dec = Buffer.from(encdata.map((encb, index) => encb ^ key[index % key.length]));
  
  console.log(`decrypted: ${dec.toString()}`);

  //const keyCheck = Buffer.from(crypto.createHash('md5').update(dec).digest().slice(0, 4));
  //if (keymaterial.equals(keyCheck)) {
  //  console.log("key correct");
  //} else {
  //  console.log("key incorrect");
  //}

  //const encryptKey = "__L_TMS_2D__"; // change this
  //const expectedSig = crypto.createHash('md5').update(Buffer.concat([dec, Buffer.from(`${encryptKey}ABCDEFGHIJKL`.slice(2, 9) + " ")])).digest();
  //if (sig.equals(expectedSig)) {
  //  console.log("signature correct");
  //} else {
  //  console.log("signature incorrect");
  //}
  return dec.toString()
}

decrypt("375b88b69cd7e35ad44ec979ebd834824c0e8c3297c4b30fcf5fdc66c1886c956db4837aff7e5081662f9e94bcbcf6c2")