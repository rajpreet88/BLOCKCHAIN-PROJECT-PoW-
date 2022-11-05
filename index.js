//<npm i express --save>
const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const PubSub = require('./publish-subscribe');
const PORT = 8000;
const app = express();

//blockchain object
const blockchain = new Blockchain();
const pubsub = new PubSub({blockchain});

//broadcast the chain to all node available in the network
setTimeout(()=> pubsub.broadcastChain(),1000);

//built-in middleware to accept post dat in JSON in expressJs
app.use(bodyParser.json());

app.get("/api/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;

  blockchain.addBlock({ data });
  res.status(200).redirect("/api/blocks");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
