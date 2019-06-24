const express = require('express');
const { sendToRabbit } = require('../Rabbit/producer');

const router = new express.Router();

router.post('/', async (req, res) => {
  res.status(200).send({ challenge: req.body.challenge });

  // this is for when a message is received, should be cleaned up to a function or something
  if (req.body && req.body.event && req.body.event.channel) {
    sendToRabbit(req.body.event.channel);
  }
});

sendToRabbit('Test');

module.exports = router;
