const axios = require('axios');
const { slackURL } = require('../util/constants');

// navigate to this URL to start process of getting token
// AuthURL = 'https://slack.com/oauth/authorize?client_id=670061830230.656543285954&scope=users:read users:read.email channels:read groups:read im:read mpim:read&redirect_uri=https://9cfe7a8e.ngrok.io/slack/auth';

const getOAuth2Token = async (code) => {
  const response = await axios.get(
    `${slackURL}/api/oauth.access?client_id=670061830230.656543285954&client_secret=242cf6105406c9f82e711e99a4efc271&redirect_uri=https://9cfe7a8e.ngrok.io/slack/auth&code=${code}`,
  );

  // add to auth token from here into the env var. It will never expire
  console.log(response.data);
};

module.exports = { getOAuth2Token };
