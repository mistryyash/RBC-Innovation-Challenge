const express = require('express');
const { handleIncomingMessage } = require('../Runners/handleIncomingMessage');

const router = new express.Router();

router.post('/', async (req, res) => {
  res.status(200).send({ challenge: req.body.challenge });
  console.log(req.body.event.channel);
  if (req.body && req.body.event && req.body.event.channel) {
    handleIncomingMessage(req.body.event.channel);
  }
});

module.exports = router;
