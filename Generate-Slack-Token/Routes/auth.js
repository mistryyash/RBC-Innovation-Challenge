const express = require('express');
const { getOAuth2Token } = require('../SlackInfoRequests/auth');

const router = new express.Router();

router.get('/', async (req, res) => {
  try {
    await getOAuth2Token(req.query.code);
    res.send('App Succesfully Installed :)');
  } catch (e) {
    res.send('Error installing app :(');
  }
});


module.exports = router;
