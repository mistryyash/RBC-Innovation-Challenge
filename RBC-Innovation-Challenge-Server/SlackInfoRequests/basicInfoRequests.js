const axios = require('axios');
const { slackURL } = require('../util/constants');


const getUserEmail = async (userID) => {
  const response = await axios.get(`${slackURL}/api/users.info?token=${process.env.SlACK_ACCESS_TOKEN}&user=${userID}`);
  return response.data.user.profile.email;
};

const getChannelMembers = async (channelID) => {
  const response = await axios.get(`${slackURL}/api/conversations.members?token=${process.env.SlACK_ACCESS_TOKEN}&channel=${channelID}`);
  return response.data.members;
};

const getUserIDFromEmail = async (email) => {
  const response = await axios.get(`${slackURL}/api/users.lookupByEmail?token=${process.env.SlACK_ACCESS_TOKEN}&email=${email}`);
  if (!response.data.ok) {
    return { error: 'unable to find user' };
  }
  return response.data.user.id;
};

module.exports = {
  getUserEmail,
  getChannelMembers,
  getUserIDFromEmail,
};
