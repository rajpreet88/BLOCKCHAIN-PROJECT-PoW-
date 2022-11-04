const crypto = require("crypto");
// const hexToBinary = require('hex-to-binary');


//spread operator is used to take as many inputs as you like
const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256"); //setting SHA256 as the hasing method
  //sorting is done to maintain the order of the hash in integrity so that come what may be the order of data passed to the function the hash remians same througout
  hash.update(inputs.sort().join("")); //concatenating the data inside the block(timestamp, prevHash,data.etc ) to pass it as input to SHA256 alogoright to generate hash of the current block
//   return hexToBinary(hash.digest("hex")); // return the outout in hexadecimal format and convert it to binary
  return hash.digest("hex"); // return the outout in hexadecimal format
};

const result = cryptoHash("hello", "world");
// console.log(result);

module.exports = { cryptoHash };
