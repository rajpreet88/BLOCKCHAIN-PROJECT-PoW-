//<npm i express --save>
const express = require('express');
const Blockchain = require('./blockchain');
const PORT = 8000;
const app = express();

app.get('/api/blocks',(req,res)=>{
    res(Blockchain.chain)
})

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
})