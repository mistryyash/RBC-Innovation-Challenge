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
  return edge.records[0]._fields[0].properties.count.low;
};

const createUser = async (id) => {
  const session = getSession();
  await session.run(queries.createNode(id));
  session.close();
};

const createEdges = async (idOne, idTwo, value) => {
  const session = getSession();
  await session.run(queries.createEdge(idOne, idTwo, value));
  await session.run(queries.createEdge(idTwo, idOne, value));
  session.close();
};

const updateEdges = async (idOne, idTwo, count) => {
  const session = getSession();
  await session.run(queries.updateEdge(idOne, idTwo, count));
  await session.run(queries.updateEdge(idTwo, idOne, count));
  session.close();
};

const addMessageCount = async (idOne, idTwo) => {
  const edgeVal = await edgeValue(idOne, idTwo);
  if (edgeVal) {
    await updateEdges(idOne, idTwo, edgeVal + 1);
  } else {
    const userExistsArr = await Promise.all([userExists(idOne), userExists(idTwo)]);
    const [userOneExists, userTwoExists] = userExistsArr;
    if (!userOneExists && !userTwoExists) {
      await Promise.all(
        [createUser(idOne),
          createUser(idTwo)],
      );
    } else if (!userOneExists) {
      await createUser(idOne);
    } else if (!userTwoExists) {
      await createUser(idTwo);
    }
    await createEdges(idOne, idTwo, 1);
  }
};

const findConnectionTraversal = async (idOne, idTwo) => {
  const session = getSession();
  const output = await session.run(queries.traverseGraph(idOne, idTwo));
  session.close();
  const pathsArr = [];
  output.records.forEach((obj) => {
    const pathObj = {
      node: obj._fields[0].properties.slackID,
      edges: [
        obj._fields[1].properties.count.low,
        obj._fields[2].properties.count.low,
      ],
    };
    pathsArr.push(pathObj);
  });
  return pathsArr;
};

// for dev purposes
const DELETEFULLDB = async () => {
  const session = getSession();
  await session.run(queries.deleteDataBase());
  session.close();
};

module.exports = {
  addMessageCount,
  findConnectionTraversal,
};
