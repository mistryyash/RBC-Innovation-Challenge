const express = require('express');
const bodyParser = require('body-parser');
require('../CouchBaseCache/setUp');
require('../RabbitConsumer/RabbitConsumer');

const meetRouter = require('../Routes/meet');

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/meet', meetRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
