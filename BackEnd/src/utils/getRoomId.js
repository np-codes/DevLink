const getRoomId = (userId, recipientId) => {
  return [userId, recipientId].sort().join(process.env.ROOM_ID_KEY);
};

module.exports = {getRoomId}

