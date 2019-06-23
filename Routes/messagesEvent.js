const express = require('express');


const router = new express.Router();

router.post('/', async (req, res) => {
  res.status(200).send({ challenge: req.body.challenge });
  /* if (req.body.event && req.body.event.user) {
    const re = await getUserEmail(req.body.event.user);
  } */
  console.log(req.body.event.channel);
});

module.exports = router;
