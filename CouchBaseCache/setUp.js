const couchbase = require('couchbase');

const cluster = new couchbase.Cluster('couchbase://localhost/');
cluster.authenticate(process.env.COUCHBASE_USERNAME, process.env.COUCHBASE_PASSWORD);
const bucket = cluster.openBucket('Channel_Members');

/* bucket.upsert('testdocTime2', { name: 'Franky' }, { expiry: 20 }, (err, result) => {
  if (err) throw err;


}); */


/*bucket.get('testdocTime2', (err, result) => {
  if (err) throw err;

  console.log(result.value);
  // {name: Frank}
}); */

const getBucket = () => bucket;

module.exports = { getBucket };
