require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./Routes/auth');

require('./CouchBaseCache/setUp');
require('./RabbitConsumer/RabbitConsumer');

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/slack/auth', authRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
