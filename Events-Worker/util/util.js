const parseSlackId = (str) => {
  const startIndex = str.indexOf('@');
  const endIndex = str.indexOf('|');
  return str.substring(startIndex + 1, endIndex);
};

const slashResponseText = (personToMeetId, commonConnectionId) => `
  Your closest mutal connection with <@${personToMeetId}> is <@${commonConnectionId}>. You should reach out to <@${commonConnectionId}> to see if they can introduce you!`;

module.exports = {
  parseSlackId,
  slashResponseText,
};
