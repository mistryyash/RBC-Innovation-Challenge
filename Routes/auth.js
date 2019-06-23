const express = require('express');
const { getOAuth2Token } = require('../SlackInfoRequests/auth');

const router = new express.Router();

router.get('/', (req, res) => {
  getOAuth2Token(req.query.code);
  res.send('App Succesfully Installed :)');
});


module.exports = router;
