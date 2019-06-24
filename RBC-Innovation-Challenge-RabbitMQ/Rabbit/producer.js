const { getChannel } = require('./connection');
const { queueName } = require('../util/constants');

const sendToRabbit = async (message) => {
  const channel = await getChannel();
  channel.sendToQueue(queueName, Buffer.from(message));
};

module.exports = {
  sendToRabbit,
};
