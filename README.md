# RBC-Innovation-Challenge

Initial set up to test locally:
- Server
  - To have the server connect to slack you need to have it hosted online, meaning localhost will not work
  - You can use ngrok to expose your localhost port to the web and therefore allow slack to access it
  - Refer to this link for how to do this https://dashboard.ngrok.com/get-started (set 4 using http 5000 or whichever port you specify in node)
  - npm install 
  - start up node (nodemon index.js)
  
- Slack
  - Sign into the workspace
  - Access this link: https://api.slack.com/apps -> select RBC Innovation Test One -> Add features and functionality -> event subscription -> update the URL to the new URL provided by ngrok
   
This process is obviously not ideal and I think we should get the code fully onto a server as soon as we can

Server version:
- server is now deployed to heroku https://aqueous-caverns-59373.herokuapp.com/slack
- test locally using postman, or briefly change URL link if you need interaction from slack
- master is the branch that is in heroku, work off of develop and we can ocasinaly merge develop into master when stable
