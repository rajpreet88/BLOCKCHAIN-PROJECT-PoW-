const Blockchain = require("./blockchain");
const blockchain = new Blockchain();

blockchain.addBlock({data:`Black Panther: Wakanda Forever`});
console.log(blockchain);

let prevBlockTimestamp, nextBlockTimestamp, nextBlock, timeDifference, avgTime;

const times = [];

for (let i = 0; i < 1000; i++) {
  prevBlockTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
  blockchain.addBlock({ data: `Block ${i}` });
  nextBlock = blockchain.chain[blockchain.chain.length - 1];
  nextBlockTimestamp = nextBlock.timestamp;

  timeDifference = nextBlockTimestamp - prevBlockTimestamp;
  times.push(timeDifference);

  avgTime = times.reduce(
    (prevValue, currentValue) => (prevValue + currentValue) / times.length
  );
  console.log(
    `Time to mine Block${i}: ${timeDifference}ms, Difficulty: ${nextBlock.difficulty}, Average Time: ${avgTime}ms`
  );
}
