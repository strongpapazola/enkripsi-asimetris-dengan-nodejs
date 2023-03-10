const crypto = require('crypto');
const fs = require('fs');

// Generate Public Key and Private Key
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 512,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'iniadalahkuncibintang'
    }
});

// Write Public Key and Private Key to file
fs.writeFileSync('bintang-public.pem', publicKey);
fs.writeFileSync('bintang-private.pem', privateKey);
