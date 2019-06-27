const { findConnectionTraversal } = require('../Neo4j_DB/db_commands');

const findBestConnectionID = async (idOne, idTwo) => {
  const pathsArr = await findConnectionTraversal(idOne, idTwo);
  let bestMatch;
  pathsArr.forEach((path) => {
    const pathScore = Math.min(...path.edges);
    if (!bestMatch || bestMatch.score < pathScore) {
      bestMatch = {
        id: path.node,
        score: pathScore,
      };
    }
  });
  if (bestMatch) {
    return bestMatch.id;
  }
  return undefined;
};

module.exports = { findBestConnectionID };
