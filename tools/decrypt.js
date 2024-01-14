const crypto = require('crypto');

const DEFAULT_KEY = "__L_TMS_2D__";

function encrypt(dec, KEY) {
    const sigFooter = Buffer.from(`${`${KEY}ABCDEFGHIJKL`.slice(2, 9)} `);
    const decbytes = Buffer.from(dec, 'utf-8');

    const sig = crypto.createHash('md5').update(Buffer.concat([decbytes, sigFooter])).digest();
    const keymaterial = crypto.createHash('md5').update(decbytes).digest().slice(0, 4);
    const key = crypto.createHash('md5').update(keymaterial).digest();

    const enc = Buffer.from(
        decbytes.map((decb, index) => decb ^ key[index % key.length])
    );

    return Buffer.concat([keymaterial, enc, sig]).toString('hex');
}

function decrypt(enc, KEY) {
    const sigFooter = Buffer.from(`${`${KEY}ABCDEFGHIJKL`.slice(2, 9)} `);
    const keymaterial = Buffer.from(enc.slice(0, 8), 'hex');
    const encdata = Buffer.from(enc.slice(8, -32), 'hex');
    const sig = Buffer.from(enc.slice(-32), 'hex');

    const key = crypto.createHash('md5').update(keymaterial).digest();
    const dec = Buffer.from(
        encdata.map((encb, index) => encb ^ key[index % key.length])
    );

    const key_correct = Buffer.compare(keymaterial, crypto.createHash('md5').update(dec).digest().slice(0, 4)) === 0;
    const sig_correct = Buffer.compare(sig, crypto.createHash('md5').update(Buffer.concat([dec, sigFooter])).digest()) === 0;

    if (key_correct && sig_correct) {
        console.log(`decrypted: ${dec.toString('utf-8')}`);
    } else if (key_correct) {
        console.log(`decrypted: ${dec.toString('utf-8')}`);
        console.log("Signature invalid");
    } else {
        console.log("Key invalid");
    }

    return dec.toString();
}

function stringToJsonObject(input) {
    const jsonObject = {};
    let inputString = `${input}`
  
    const pairs = inputString.split('&');
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      jsonObject[key] = isNaN(value) ? value : parseFloat(value);
    }
  
    return jsonObject;
  }

module.exports = { decrypt, stringToJsonObject, encrypt };

// Just a quick decrypt for when I need it...
//decrypt("f8ea52500f4c5c8bef58563233ea81a3a891fef20d5900aada11483e60bf9af1e186e5e81b4c58a0e053193c61b589b3a283f1a81b12509aee56503a60f6c2aee187fff60f4100cfaf68503251e5931f52be04d240d6583fc77d45e2828a30",DEFAULT_KEY)