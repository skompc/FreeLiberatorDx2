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
decrypt("1c323dd6196f3a7f49b1e6a592b96b9700ecf1d057297d7942d3befbc4e7679442efa282083e692a45e8f2a790ad69d05cbcb5855b2b7e2a4fa9e5a7c3fc2ec352bfb590597a702915a9e0f187bd3e971ef9e2d8356e287d11aab3f3fde134d718b0a280083e6c7a09bee5e0cce12b9445bfa2860b306e3d1eeff2a790fc23c112a8b5874f283a331da9e0f187bd3e9703f8f5db572a7d6873edb4e19fba7cd428ece4c1572b7d4758e188a893be6ad9ec825642e54d49b2a42e4bd0108a07",DEFAULT_KEY)