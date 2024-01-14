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
        console.log(`decrypted: ${dec.toString('utf-8')}`);
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
//decrypt("843bc84f2863cdd2f353717b23c959bffb47c48d37639184b00f2e147a960ef6b407829a7e20ce90a45c292f36ca5abcba439cc96a209f85b35c236e21ca09edfd5092ca69329fd4bd5c717f24cc50aabf1680dd6c738980f248293f769537ecfa478ade3f71f3dcf8082f7636cd0abcbe4092ca6962c2dce74b727936cb09b2bf07859b7e259ec1ef1e256e21ca4daae80986dd6c738980f2482d22608b01f6e77dc59d2862c0c1ab5e662f769e0df8fd7dd4972e79d888a54833267da70bf1e84cd09d66268ad8f7161f2f729509feec1f80cf7d63d9c7f853716d63a709fafd1f86de3e48cdd6e253706d7e9d05c6ea4cc3c56b31c8c1f51c1f2e618a55a9af4fd295047bc3d2ab48232776991ac6fd4f8acc6d2e9a86b0072e2d7cc54daeeb0785ca3264f3dbf91a1f3e609106fed641d8953676c2d1b35c726e209959bcbb4192ca6973c9c3ff021f227d9e07bcbb1092cb3a3299d7b35c726e249a4dacea0785ca2e79c5c4c907246e269b4dabbb0784996f279881a759727b2bc059bcbb4192cd38329e87f20b262e728c37f7fc4f92cd38329e87b35d217836ca0bbcbc4192ca697fdc90a30d657921dd5bf8b81482dd69748980f54b727967971cf8e57dd3993676cbd0b35b236e21ca4daae8138ec97e25cf90a30d6579219b07f7ed7dd69c3f48d8cce60b657e70dd5aabac11d6dd6e758980f24b722836cd0bbcbb10d4973573f3d4f20a1f287c8d06edac17d4dd69258986f74b752936cd0cbcbb4192cd38329e87f70d34227c9637ebec51c2942f48d8cce60b657e70dd5aabac11d6dd6e759f90a30a657970dd5dfaac1085993863c5daf831322e608d04edd641d88d35638980f54b727936cb09bcbc4085dd6e738982f24b727936ca0bbcbb1092cf393299d6b35c723e7d9119c6e04692cd38329e87b35d217f23cc5ca8be1087c063258987f54b752836ca5afdec44d2992f48c2c0fb4b752836ca5abcba4387dd69748980f54b72797b884dacea0785ca7e24cd84a35f657970dd5dfaac10858c3463cdd9c90a2126729f0dbcbc4192ca69329fd4a64b722836cd0bbcbb10d4973573f3d4f20a1f3f6a880dbcbc4192ca69329fd4b35b226e269c4dabea07829b7e259ed6f9002414729c0cc6ea4dc2962f3299d6b35c726e20994daceb07829c7e25cf90a30d657921990bede04dd9a72972dfc0fa1a1f3f6a880dbcbc4192ca69329fd4b35b226e269c4dabea07829b7e259ed4f51a29247da71afcfa57db8c0474c3c0f81a657e70dd5aabac11d6dd6e758980f24b772f36ca5abcbb4192ca69329bd7b35b236e21ca1df7e053e8913f3299d6b35c726e20995ca9bd1686cf6927948daf4b722836cd0bbcbb10d39d3d72cdc1c900352636cd0bbcbb1092cb3a278987f54b752836ca5af1f907829b7e259e90a50f717322dd5afaac17d4dd6925d8dae20f2c14779905f8ee4792cd38329e87b35d217b36ca0bbcbc4192ca6974c3dbf231212f77a71ce0f94792cd38329e87b35d216e269a4daced07859b7e22cf90a45c23247d9c37f8ed46e89b3462c2c1b35b236e21ca4daae807829a7e22c890a40d657e70dd5aabe841c3913479f3c7f31d352767a71ce0f94792cd38329e87b35d216e269a4daced07859b7e22cf90a45c2128679107f7d650d28b2e7bd8eaf501352567dd5dfaac1085dd68768980f44b752f36cf0cbcbb1092cd3f329ed6b35c722e7d9d05e0d646d28e327bf3dcf8082f6e21ca4daae807829a7e259e90a10c657e70dd5aabfc4cde89047ec890a30d657921dd5bf8bd07859b7e22cf90a45c242e759d09edd64cc2957e22cf90a45c657872c84dabea07829b7e259edde64b752836ca5abcba4387dd69748980f54b727967971cf8e57dd3993676cbd0b35b236e21ca4daae81292ca383299d6b35c72287c960cc6e846d3a72f6edcd0b35b236e21ca4daae807829a7e22c890a40d657e70dd5aabea4dd99c0476c8d1c90d2f3e7d8c4dacea0785ca7e24cd90a30c657e77dd5afaac17d4dd6925cdd6e2072f254c8a0deafc4ec3a72f6edcd0b35b236e21ca4daae807829a7e22c890a40d657e70dd5aabe841c3913479f3c7f31d352767a70bf6fc4cc3dd6e748987a44b732a36cd0abcbc4692cf3f329e87b35c236e21ca4daeeb07829b7e259ec0f80731147a9c4dacea0785ca7e24cd80b35c236e269b4dabbb46d29e3e76d8eaf81b2d6e269b4dabbb0784996b329ed6b35b236e21ca00e9ac17d4dd69258986f75e657970dd5dfaac10858c3463cdd9c90a2126729f0dbcbc4192ca69329fd4a64b722836cd0bbcbb10d4973573f3d4f20a1f3f6a880dbcbc4192ca69329fd4b35b226e269c4dabea07829b7e259ed6f9002414729c0cc6ea4dc2962f3299d6b35c726e20994daceb07829c7e25cf90a30d657921990bede04dd9a72972dfc0fa1a1f3f6a880dbcbc4192ca69329fd4b35b226e269c4dabea07829b7e259ed4f51a29247da71afcfa57db8c0474c3c0f81a657e70dd5aabac11d6dd6e758980f24b772f36ca5abcbb4192ca69329bd7b35b236e21ca1df7e053e8913f3299d6b35c726e20995ebcbb4192cd38329e87f20b262e728c37f7fc4f92cd38329e87b35d217b36ca0bbcbc4192ca697fdc90a30d657921dd5bf8b907859b7e22cf90a45c3424679904c6ed43da993c728980f54b727936cb09a9ac10d4dd6e748987a40d2f2577a709fded7dc3812b728980f54b727936cb09bcbc4092cd3f329ed6b35b236e21ca0bf6e746e8993f73f3d6f91b2e3f36cd0bbcbb1092cb3a3299d7b35b246e219b4dacea0785ca3a74d8dcf9001f39768b1df5fd7dc3812b728980f54b727936cb09bcbc4092cd3f329ed6b35b236e21ca09fafd4bd8960465c9c6e302341470971df7fd07829b7e259e90a50f657e71dd5dfdac15d3dd69258980f24b722836ca5aebec51c2942f48c8c7f7032114708d1cf0e70785ca7e24cd90a30c657e77dd5ffdaf7dc395042a98865f4abbf1d783f2de5a39a139486e2c43",DEFAULT_KEY)