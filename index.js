require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./Routes/auth');
const messageRouter = require('./Routes/messagesEvent');

require('./CouchBaseCache/setUp');

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/slack/auth', authRouter);
app.use('/slack', messageRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
