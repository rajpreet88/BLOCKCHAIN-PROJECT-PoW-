const { GENESIS_BLOCK, MINE_RATE } = require("./config");
const { cryptoHash } = require("./crypto-hash");
// install a library <npm i hex-to-binary@1.0.1 --save> to have more control on the difficulty since binary providees greater control on the difficulty
const hexToBinary = require('hex-to-binary');

/************************************************************************** */


class Block {
  constructor({ timestamp, prevHash, hash, nonce, difficulty, data }) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.nonce = nonce;
    this.difficulty = difficulty;
    this.data = data;
  }

  //the static function is used to call the function as a whole of the class an not as any instance if the class when an object is created
  static genesis() {
    return new this(GENESIS_BLOCK);
  }

  //mining the block
  static mineBlock({ prevBlock, data }) {
    let hash, timestamp;
    // const timestamp = Date.now();
    let nonce = 0;
    let { difficulty } = prevBlock;
    const prevHash = prevBlock.hash;

    //now looping the nonce to solve the difficulty to generate the current hash while mining the block
    //the loop is repeated to generate the hash until the first n(difficulty) chars in the hash matches 00 to solve the mathematical problem to getting the nearest hash as per the difficulty set
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({
        originalBlock: prevBlock,
        timestamp,
      });
      hash = cryptoHash(timestamp, prevHash, nonce, difficulty, data);
    } while (hexToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty));
    // return new Block({
    //     timestamp,
    //     prevHash,
    //     nonce,
    //     difficulty,
    //     data,
    //     hash
    // });
    return new this({
      timestamp,
      prevHash,
      nonce,
      difficulty,
      data,
      hash:'0x'+ hash,
    });
  }

  // Adjust difficulty as per the hashing rate or time taken to mine a block
  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;

    const difference = timestamp - originalBlock.timestamp;
    if (difficulty < 1) return 1;
    if (difference > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}

//creating object of the Block Class to call the constructor
// const block1 = new Block({
//   timestamp: "11/10/22",
//   prevHash: "0xacb",
//   hash: "0xc12",
//   data: "Hello World",
// });
// const block2 = new Block("11/10/22","0xc12","0x123","World");
// console.log(block1);
// const genesisBlock = Block.genesis();
// console.log(genesisBlock)

// console.log(Block.mineBlock({prevBlock: block1, data: "Block2"}))

module.exports = Block;
