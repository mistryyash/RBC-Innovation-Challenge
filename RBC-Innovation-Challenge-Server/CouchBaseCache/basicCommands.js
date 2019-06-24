const { getBucket } = require('./setUp');
const { secondsInADay } = require('../util/constants');


// time to live is set to 1 day
const addToCache = (channelID, members) => new Promise((resolve, reject) => {
  getBucket().upsert(channelID, members, { expiry: secondsInADay }, (err, result) => {
    if (err) {
      reject(err);
    } else {
      resolve(result.value);
    }
  });
});

// get request resets the time to live
const getValueFromCache = channelID => new Promise((resolve, reject) => {
  getBucket().getAndTouch(channelID, secondsInADay, (err, result) => {
    if (err) {
      console.log(err);
      reject(err);
    } else {
      resolve(result.value);
    }
  });
});

module.exports = {
  addToCache,
  getValueFromCache,
};
