require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const messageRouter = require('./Routes/messagesEvent');

const app = express();
const port = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/slack', messageRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
