const now = require('performance-now');
const amqp = require('amqplib/callback_api');
const { handleIncomingMessage } = require('../Runners/handleIncomingMessage');

amqp.connect('amqp://localhost', (error0, connection) => {
  if (error0) {
    throw error0;
  }
  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = 'RBC_INNOVATION_CHALLENGE';

    // true in prod but don't want to clog my local machine
    channel.assertQueue(queue, {
      durable: false,
    });

    // each worker can have 5 jobs at a time
    // not sure what the right value here would be
    channel.prefetch(1);

    console.log('Rabbit is up and waiting for messages!');

    channel.consume(queue, async (msg) => {
      const start = now();
      console.log(`start: ${start}`);
      try {
        await handleIncomingMessage(msg.content.toString());
      } catch (e) {
        // not crash on failure
        console.log(e);
      }
      const end = now();
      console.log(`next: ${start - end}`);
      channel.ack(msg); // tell rabbit code is done with the message
    }, {
      noAck: false,
    });
  });
});
