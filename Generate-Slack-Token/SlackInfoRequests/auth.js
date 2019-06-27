const axios = require('axios');
const { slackURL } = require('../util/constants');


const getOAuth2Token = async (code) => {
  const response = await axios.get(
    `${slackURL}/api/oauth.access?client_id=${process.env.SLACK_CLIENT_ID}&client_secret=${process.env.SLACK_CLIENT_SECRET_ID}&redirect_uri=${process.env.NGROK_URL}&code=${code}`,
  );

  if (response.data.error) {
    throw new Error('something went wrong with slack auth request');
  }
  console.log(response.data);
};

module.exports = { getOAuth2Token };
