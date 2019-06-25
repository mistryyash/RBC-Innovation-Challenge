const parseSlackId = (str) => {
  const startIndex = str.indexOf('@');
  const endIndex = str.indexOf('|');
  return str.substring(startIndex + 1, endIndex);
};

module.exports = {
  parseSlackId,
};
