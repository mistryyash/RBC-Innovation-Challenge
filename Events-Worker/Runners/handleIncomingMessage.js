const { getChannelMembers } = require('../SlackInfoRequests/basicInfoRequests');
const { addMessageCount } = require('../db/db_commands');
const cache = require('../CouchBaseCache/basicCommands');

const handleIncomingMessage = async (channelID) => {
  let channelMembers;
  try {
    channelMembers = await cache.getValueFromCache(channelID);
  } catch (e) {
    channelMembers = await getChannelMembers(channelID);
    if (!channelMembers) {
      throw new Error('Could not find channel members');
    }
    cache.addToCache(channelID, channelMembers);
  }

  await addMessageCount(...channelMembers);
  console.log('Message Succesfully processed!');
};

module.exports = {
  handleIncomingMessage,
};
