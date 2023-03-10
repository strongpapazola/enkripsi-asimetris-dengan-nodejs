const crypto = require('crypto');
const fs = require('fs');

var pengirim = "bintang"
var phasephere_bintang = "iniadalahkuncibintang"

// Baca Public Key dan Private key dari file
var ninapublicKey = fs.readFileSync('nina-public.pem', 'utf8');
var bintangprivateKey = fs.readFileSync('bintang-private.pem', 'utf8');


baca = fs.readFileSync('pesan.json', 'utf8');
baca = JSON.parse(baca);
console.log("Pesan yang diterima dari bintang: " + baca.pesan);
console.log("Signature yang diterima dari bintang: " + baca.signature);
// baca pesan menggunakan private key nina
var decrypted = crypto.privateDecrypt({ key: bintangprivateKey, passphrase: phasephere_bintang }, Buffer.from(baca.pesan, 'base64'));
console.log("Pesan yang telah didekripsi: " + decrypted.toString('utf8'));

// verifikasi signature dengan public key bintang
var verify = crypto.createVerify('SHA256');
verify.update(decrypted);
verify.end();
var verified = verify.verify(ninapublicKey, baca.signature, 'base64');
console.log("Verifikasi Signature: " + verified);


// // Terima Input dari Terminal
// var readline = require('readline');
// var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// console.log("Masukkan pesan yang akan dikirimkan ke Nina : ");
// rl.on('line', function (pesan) {
//     console.log("Pesan yang akan dikirimkan ke Nina: " + pesan);

//     data = {}

//     // Enksripsi Pesan dengan Public Key Nina
//     var encrypted = crypto.publicEncrypt(ninapublicKey, Buffer.from(pesan));
//     console.log("Pesan yang telah dienkripsi: " + encrypted.toString('base64'));
//     data["pesan"] = encrypted.toString('base64');   

//     // Buat Signature dengan Private Key Bintang
//     var sign = crypto.createSign('SHA256');
//     sign.update(pesan);
//     sign.end();
//     data["signature"] = sign.sign({ key: bintangprivateKey, passphrase: phasephere_bintang }, 'base64');

//     console.log("Signature: " + data["signature"]);

//     console.log("Data yang akan dikirimkan ke Nina: " + JSON.stringify(data));

//     write = JSON.stringify(data);
//     fs.writeFileSync('pesan.json', write);
//     console.log("Data telah disimpan di file pesan.json");

// });

