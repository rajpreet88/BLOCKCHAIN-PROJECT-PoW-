//<npm i express --save>
const express = require('express');
const Blockchain = require('./blockchain');
const PORT = 8000;
const app = express();

//blockchain object
const blockchain = new Blockchain();

app.get('/api/blocks',(req,res)=>{
    res.json(blockchain.chain)
})

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})