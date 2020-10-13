const { generateKeyPair, createSign, createVerify } = require("crypto");
/*
generateKeyPair('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: ''
  }
}, (err, publicKey, privateKey) => {
  // Handle errors and use the generated key pair.
  if(err) console.log("Error!");
  console.log({publicKey, privateKey})
});
*/

generateKeyPair(
  "rsa",
  {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
      cipher: "aes-256-cbc", //Optional
      passphrase: "top secret", //Optional
    },
  },
  (err, publicKey, privateKey) => {
    // Handle errors and use the generated key pair.
    if (err) console.log("Error!");
    console.log({
      publicKey,
      privateKey,
    });

    //Create some sample data that we want to sign
    const verifiableData = "this need to be verified";

    // The signature method takes the data we want to sign, the
    // hashing algorithm, and the padding scheme, and generates
    // a signature in the form of bytes
    const signature = require("crypto").sign("sha256", Buffer.from(verifiableData), {
      key: privateKey,
      padding: require("crypto").constants.RSA_PKCS1_PSS_PADDING,
      passphrase: "top secret"//Optional
    });

    console.log(signature.toString("base64"));

    // To verify the data, we provide the same hashing algorithm and
    // padding scheme we provided to generate the signature, along
    // with the signature itself, the data that we want to
    // verify against the signature, and the public key
    const isVerified = require("crypto").verify(
      "sha256",
      Buffer.from(verifiableData),
      {
        key: publicKey,
        padding: require("crypto").constants.RSA_PKCS1_PSS_PADDING,
      },
      Buffer.from(signature.toString("base64"), "base64")
    );

    // isVerified should be `true` if the signature is valid
    console.log("signature verified: ", isVerified);
  }
);
