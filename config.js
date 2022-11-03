const INITIAL_DIFFICULTY = 2;

const GENESIS_BLOCK = {
    timestamp: 1,
    prevHash: "0x000",
    hash: "0x123",
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data:[],

}

module.exports= {GENESIS_BLOCK};