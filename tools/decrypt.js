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
//decrypt("39f2861762e137b85e81f87638326a3ddad0312c3ac804e40d9af92219595f3cfee11f0e65c0279461ddd57a4a2b533da0dc1a1267b035e74986b47c175c1376ffdf4d2f45c172a44e8cf939183b426aaac34e5146c7109218adbb0d39516f39d2b64f2d42b612ee1adbcd7f49566e37d1a01e0066e13f884880e82e4052053db9b64d4644e607b04c80c919490c6d7eb1ea1c0664bf65f15b83ed3f1b0b5963aab45b0b6cf73aa35996b11e2e424a7de4e3093761f73ab3478ad33d18165867f8e8405e2db17ae705a2bb032728694baece071b5aa436a2458be02e220d4f33f4e9104670e733b6058bbe2618034a7af2e8530d6da437b85b9fed764d42747afad9405a32dca519299bf7e93e731b73c442fd7aba",DEFAULT_KEY)