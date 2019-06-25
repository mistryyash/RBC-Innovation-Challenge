const axios = require('axios');
const { slackURL } = require('../util/constants');

/* navigate to this URL to start process of getting token
* AuthURL = 'https://slack.com/oauth/authorize?client_id=* CLient ID *&scope=*space seperate wanted permission*&redirect_uri=*ngrok url for this server/slack/auth*';
* It will hit the auth endpoint which will make the request for 2auth token and then console log it
*/
const getOAuth2Token = async (code, ngrokUrl) => {
  const response = await axios.get(
    `${slackURL}/api/oauth.access?client_id=${process.env.SLACK_CLIENT_ID}&client_secret=${process.env.SLACK_CLIENT_SECRET_ID}&redirect_uri=${ngrokUrl}=${code}`,
  );

  // add to auth token from here into the env var. It will never expire
  if (response.data.error) {
    throw new Error('something went wrong with slack auth request');
  }
  console.log(response.data);
};

module.exports = { getOAuth2Token };
