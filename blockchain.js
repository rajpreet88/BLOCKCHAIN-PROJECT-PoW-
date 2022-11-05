const Block = require("./block");
const { cryptoHash } = require("./crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()]; //adding the genesis block to the blockchain array
  }

  //adding subsequent blocks in this function
  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      prevBlock: this.chain[this.chain.length - 1], //this is same as this.chain[0] which is the genesis block
      data,
    });
    this.chain.push(newBlock);
  }

  //checking that incoming chain follows the longest chain rule
  replaceChain(chain) {
    if (chain.length <= this.chain.length && chain.length === 1) {
      console.log('Chain Length: ',chain.length)
      console.log('This.chain Length: ',this.chain.length)
      console.error("This incoming Chain doesnt follow the longest Chain rule");
      return;
    }

    //check to find the longest chain is not mailicious and is valid
    if (!Blockchain.isValidChain(chain)) {
      console.error("The incoming chain is not valid");
      return;
    }
    this.chain = chain;
  }

  //Function to check if the block is valid or not
  static isValidChain(chain) {
    //checking that the first block in the new chain is equal to the genesis block or not
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    //now lets validate the chains following the genesis block
    for (let i = 1; i < chain.length; i++) {
      const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i]; //destructuring the chain object

      const lasDifficulty = chain[i-1].difficulty;

      const realPrevHash = chain[i - 1].hash;

      //checking whether prevHash of current block is equal to hash of previous block or not
      if (realPrevHash !== prevHash) {
        // console.log( prevHash );
        return false;
      }

      //storing the hash generated through SHA256 algo
      const validatedHash =
        '0x'+cryptoHash(timestamp, prevHash, nonce, difficulty, data);

      //validating that the difficulty is not tampered by the miner for too high or too low as malicious activity
      if(Math.abs(lasDifficulty-difficulty)>1){
        return false;
      }

      //now validating the hash generated through SHA256 for current block and the hash already in the current block explicitly to prevent any hacks
      if (hash !== validatedHash) {
        return false;
      }
    }
    return true;
  }
}

const blockchain = new Blockchain();
blockchain.addBlock({ data: "Block1" });
blockchain.addBlock({ data: "Block2" });
// console.log(blockchain);
// const result = Blockchain.isValidChain(blockchain.chain);
// console.log(result);
// console.log(blockchain.chain);

module.exports = Blockchain;
