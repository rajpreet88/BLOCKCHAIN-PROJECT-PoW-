const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()]; //adding the genesis block to the blockchain array
    }

    //adding subsequent blocks in this function
    addBlock({ data }){
        const newBlock = Block.mineBlock({ 
            prevBlock: this.chain[this.chain.length-1], //this is same as this.chain[0] which is the genesis block
            data
        })
        this.chain.push(newBlock);
    }
}

const blockchain = new Blockchain();
blockchain.addBlock({ data:"Block1"})
console.log(blockchain);

module.exports = Blockchain;