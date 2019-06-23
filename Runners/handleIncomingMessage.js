const { getChannelMembers } = require('../SlackInfoRequests/basicInfoRequests');
const { addMessageCount } = require('../db/db_commands');

const handleIncomingMessage = async (channelID) => {
  const channelMembers = await getChannelMembers(channelID);
  await addMessageCount(...channelMembers);
};

module.exports = {
  handleIncomingMessage,
};
