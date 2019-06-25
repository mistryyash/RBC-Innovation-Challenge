require('dotenv').config();
const cluster = require('cluster');
const express = require('express');
const bodyParser = require('body-parser');
const numCPUs = Math.min(require('os').cpus().length, 2);

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  console.log(`Worker ${process.pid} started`);
  require('./CouchBaseCache/setUp');
  require('./RabbitConsumer/RabbitConsumer');

  const app = express();
  const port = process.env.PORT || 5000;


  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());

  app.listen(port, () => console.log(`Listening on port ${port}`));
}
