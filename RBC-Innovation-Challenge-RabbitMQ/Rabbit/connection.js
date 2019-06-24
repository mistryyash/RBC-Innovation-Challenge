const amqp = require('amqplib/callback_api');
const nodeCleanup = require('node-cleanup');
const { queueName } = require('../util/constants');

let rabbitConnection;
let rabbitChannel;

nodeCleanup(() => {
  if (rabbitConnection) {
    rabbitConnection.close();
  }
  console.log('exit');
});


const setConnectionAndChannel = () => new Promise((resolve, reject) => {
  amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
      reject(error0);
    }
    rabbitConnection = connection;
    rabbitConnection.createChannel((error1, channel) => {
      if (error1) {
        reject(error1);
      }


      channel.assertQueue(queueName, {
        durable: false,
      });
      rabbitChannel = channel;
      resolve();
    });
  });
});

const connectionPromise = setConnectionAndChannel();

const getChannel = async () => {
  if (!rabbitChannel) {
    await connectionPromise;
  }
  if (!rabbitChannel) {
    throw new Error('There was a problem connecting to rabbit!');
  }
  return rabbitChannel;
};

module.exports = {
  getChannel,
};
