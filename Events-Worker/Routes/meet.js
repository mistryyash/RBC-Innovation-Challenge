const { parseSlackId } = require('../util/util');

const express = require('express');

const router = new express.Router();

router.post('/', (req, res) => {
  const userID = req.body.user_id;
  const personToMeetRaw = req.body.text;
  const personToMeetId = parseSlackId(personToMeetRaw);
  /*
   * 1) Make a call to method which will access the DB
            -> hint it is an async function!
   * 2) Then return the result
   * 3) Bouns - look into error handling
   */
});

module.exports = router;
