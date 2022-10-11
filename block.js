const {GENESIS_BLOCK} = require('./config');
const {cryptoHash} = require('./crypto-hash');

class Block{
    constructor({timestamp, prevHash, hash, data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
    }

    //this static function is used to prevent the function from being everytime there is a new object/block created 
    static genesis(){
        return new this(GENESIS_BLOCK);
    }

    //mining the block
    static mineBlock({prevBlock, data}){
        const timestamp = Date.now();
        const prevHash = prevBlock.hash;
        return new Block({
            timestamp, 
            prevHash,
            hash : cryptoHash(timestamp, prevHash, data),
            data    
        });

    }
}

//creating object of the Block Class to call the constructor
const block1 = new Block(
    {
        timestamp: "11/10/22",
        prevHash: "0xacb",
        hash: "0xc12",
        data: "Hello World"
    });
// const block2 = new Block("11/10/22","0xc12","0x123","World");
// console.log(block1);
const genesisBlock = Block.genesis();
console.log(genesisBlock)

console.log(Block.mineBlock({prevBlock: block1, data: "Block2"}))