const createNode = id => `
  CREATE (n:Person {slackID:'${id}'}) 
  RETURN n.slackID
  `;

const createEdge = (idOne, idTwo, count) => `
  MATCH (a:Person),(b:Person)
  WHERE a.slackID="${idOne}" AND b.slackID="${idTwo}"
  CREATE (a)-[r:messaged {count: ${count}}]->(b)
  RETURN r
  `;


const deleteDataBase = () => `
  MATCH (n) 
  DETACH 
  DELETE n
  `;

const findUser = id => `
  MATCH (a:Person) 
  WHERE a.slackID="${id}" 
  RETURN a
  `;

const findEdge = (idOne, idTwo) => `
  MATCH (a:Person)-[r:messaged]->(b:Person)
  WHERE a.slackID = "${idOne}" AND b.slackID = "${idTwo}"
  RETURN r
  `;

const updateEdge = (idOne, idTwo, count) => `
  MATCH (a:Person)-[r:messaged]->(b:Person)
  WHERE a.slackID = "${idOne}" AND b.slackID = "${idTwo}" 
  SET r={count: ${count}}
  RETURN r
  `;

const traverseGraph = (idOne, idTwo) => `
  MATCH (a:Person)-[d:messaged]->(b:Person)-[e:messaged]->(c:Person)
  WHERE a.slackID = "${idOne}" AND c.slackID = "${idTwo}"
  RETURN b,d,e
  `;

module.exports = {
  createNode,
  createEdge,
  deleteDataBase,
  findUser,
  findEdge,
  updateEdge,
  traverseGraph,
};
