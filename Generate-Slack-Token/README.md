# Auth 

The purpose of this code is to generate an auth token.

The steps: 
1) npm install
2) npm start
3) set up ngrok on port 5000
4) configure you enviroment variables as seen in ./SlackInfoRequests/auth.js
5) fill in the required fields in this url and enter it into your browser
    - 'https://slack.com/oauth/authorize?client_id=* Client ID *&scope=*space seperate wanted permission*&redirect_uri=*ngrok url for this server/slack/auth*
6) the token will now appear in the console, copy it into our .env variables online where you want it

Refer to the docs for a more detailed explanation as to what is happening: https://api.slack.com/docs/oauth