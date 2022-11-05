//this module will be used to publish and subscribe nodes for mining
// const Blockchain = require('./blockchain');
// const blockchain = new Blockchain();

const redis = require("redis");
const client = redis.createClient();

const CHANNELS = {
  TEST: "TEST",
  BLOCKCHAIN: "BLOCKCHAIN",
};

class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain;
    this.publisher = redis.createClient(); //creating publisher client
    this.publisher.connect();

    this.subscriber = redis.createClient(); //creating subscriber client
    this.subscriber.connect();

    this.subscriber.subscribe(CHANNELS.TEST, (channel, message) => {
      this.handleMessage(channel, message);
    }); //subscribing to the published channel e.g. TEST channel and also handling the message from the publisher
    this.subscriber.subscribe(CHANNELS.BLOCKCHAIN, (channel, message) => {
      this.handleMessage(channel, message);
    }); //subscribing to the published channel e.g. BLOCKCHAIN channel and also handling the message from the publisher

    //Handling the published message by the publisher in the channel  using 'on' event method
    // this.subscriber.on("message", (channel, message) => {
    //   this.handleMessage(channel, message);
    // });
  }
  handleMessage(message, channel) {
    console.log(
      `Message received in channel: ${channel} with message: ${message}`
    );
    const parseMessage = JSON.parse(message);
    if (channel === CHANNELS.BLOCKCHAIN) {
      // the new message in form of new block-chain should come in the blockchain channel. If yes then we can replacethe older chain with the new message cum blockchain
      this.blockchain.replaceChain(parseMessage);
    }
  }

  //publish channel
  publish({ channel, message }) {
    this.publisher.publish(channel, message);
  }

  //broadcast the chain to all nodes in the network once validation is successful
  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }
}

// const checkPubSub = new PubSub();

// //publishing message in the channels available after sometime so that the subscriber is ready with its subscription
// setTimeout(
//   () => checkPubSub.publisher.publish(CHANNELS.TEST, "Metaverse"),
//   1000
// );

module.exports = PubSub;
