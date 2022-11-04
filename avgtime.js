const Blockchain = require("./blockchain");
const blockchain = new Blockchain();

// added a block initially to decrease the time difference. If no block in added initially then the UNIX timestamp will fetch the timeDifference from current/next block and genesis block which we have set to 1.
blockchain.addBlock({ data: `Black Panther: Wakanda Forever` });
console.log(blockchain.chain[blockchain.chain.length-1]);

let prevBlockTimestamp, nextBlockTimestamp, nextBlock, timeDifference, avgTime;

const times = [];

for (let i = 0; i < 1000; i++) {
  prevBlockTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
  blockchain.addBlock({ data: `Block ${i}` });
  nextBlock = blockchain.chain[blockchain.chain.length - 1];
  nextBlockTimestamp = nextBlock.timestamp;

  timeDifference = nextBlockTimestamp - prevBlockTimestamp;
  times.push(timeDifference);

  avgTime = times.reduce((prevValue, currentValue) => prevValue + currentValue) / times.length;
  
    console.log(
    `Time to mine Block${i}: ${timeDifference}ms, Difficulty: ${nextBlock.difficulty}, Average Time: ${avgTime}ms`
  );
}



