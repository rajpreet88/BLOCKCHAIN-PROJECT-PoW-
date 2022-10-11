class Block{
    constructor(timestamp, prevHash, hash, data){
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data= data;
    }
}

//creating object of the Block Class to call the constructor initially
const block1 = new Block("11/10/22","0xacb","0xc12","Hello");