//<npm i express --save>
const express = require("express");
const bodyParser = require("body-parser");
const Blockchain = require("./blockchain");
const PubSub = require("./publish-subscribe");
const request = require("request");

let PEER_PORT;

const app = express();

//blockchain object
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

//broadcast the chain to all node available in the network
setTimeout(() => pubsub.broadcastChain(), 1000);

//root node address or URL
const DEFAULT_PORT = 8000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

//built-in middleware to accept post dat in JSON in expressJs
app.use(bodyParser.json());

app.get("/api/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/api/mine", (req, res) => {
  const { data } = req.body;
  blockchain.addBlock({ data }); //add block after validation and then broadcast for all the node isn the network
  pubsub.broadcastChain();
  res.status(200).redirect("/api/blocks");
});

//sync function to sync the latest chain across all new incoming nodes
const syncChains = () => {
  request(
    { url: `${ROOT_NODE_ADDRESS}/api/blocks` },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const rootChain = JSON.parse(body);
        console.log(`Replace chain on sync with:`, rootChain);
        blockchain.replaceChain(rootChain);
      }
    }
  );
};

//dynamically generate peer ports
if (process.env.GENERATE_PEER_PORT === "true") {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

let PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  syncChains();
});
