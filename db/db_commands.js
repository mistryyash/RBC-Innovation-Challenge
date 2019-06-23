const { getSession } = require('./createConnection');
const queries = require('./db_queries');

const userExists = async (id) => {
  const session = getSession();
  const user = await session.run(queries.findUser(id));
  session.close();
  if (user.records.length === 0) {
    return false;
  }
  return true;
};

const edgeValue = async (idOne, idTwo) => {
  const session = getSession();
  const edge = await session.run(queries.findEdge(idOne, idTwo));
  session.close();
  if (edge.records.length === 0) {
    return false;
  }

  // this command may fail on large numbers - better solution needed
  return edge.records[0]._fields[0].properties.count.low;
};

const createUser = async (id) => {
  const session = getSession();
  await session.run(queries.createNode(id));
  session.close();
};

const createEdge = async (idOne, idTwo, value) => {
  const session = getSession();
  await session.run(queries.createEdge(idOne, idTwo, value));
  session.close();
};

const updateEdge = async (idOne, idTwo, count) => {
  const session = getSession();
  await session.run(queries.updateEdge(idOne, idTwo, count));
  session.close();
};

// command not yet functional - fixing needed
const addMessageCount = async (idOne, idTwo) => {
  const edgeVal = await edgeValue(idOne, idTwo);
  if (edgeVal) {
    updateEdge(idOne, idTwo, edgeValue + 1);
    return true;
  }
  if (!userExists(idOne)) {
    createUser(idOne);
  }
  if (!userExists(idTwo)) {
    createUser(idTwo);
  }
  createEdge(idOne, idTwo, 1);
};

// for dev purposes
const DELETEFULLDB = async () => {
  const session = getSession();
  await session.run(queries.deleteDataBase());
  session.close();
};

// createUser('temp', 'temp@temp.com');
// userExists('dicks');
const runnerTemp = async () => {

};

runnerTemp();
