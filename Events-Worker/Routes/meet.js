const express = require('express');
const { parseSlackId, slashResponseText } = require('../util/util');
const { findBestConnectionID } = require('../Runners/findBestConnection');

const router = new express.Router();

router.post('/', async (req, res) => {
  const userId = req.body.user_id;
  const personToMeetId = parseSlackId(req.body.text);
  try {
    const connectionId = await findBestConnectionID(userId, personToMeetId);
    let responseText;
    if (connectionId) {
      responseText = slashResponseText(personToMeetId, connectionId);
    } else {
      responseText = `Sorry you do not have any common connections with <@${personToMeetId}>`;
    }
    res.status(200).send(responseText);
  } catch (e) {
    res.status(500).send('Sorry, it seems the app has a server error, please try again later');
  }
});

module.exports = router;
