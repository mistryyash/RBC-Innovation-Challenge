require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(express.json());

app.post("/slack", (req,res) => {
    console.log(req.body);
    res.status(200).send({"challenge":req.body.challenge});
});

app.listen(port, () => console.log("we up"));