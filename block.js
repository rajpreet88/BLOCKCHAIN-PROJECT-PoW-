class Block{
    constructor({timestamp, prevHash, hash, data}){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
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
console.log(block1);