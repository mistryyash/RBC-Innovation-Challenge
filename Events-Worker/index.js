require('dotenv').config();
const cluster = require('cluster');
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
  require('./Cluster/worker');
}
