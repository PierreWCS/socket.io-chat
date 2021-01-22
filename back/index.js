const server = require('http').createServer();
const io = require('socket.io')(server);

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = 'newChatMessage';
const USER_LEFT_ROOM = 'userLeftTheRoom';
const USER_ENTERED = 'userEnteredTheRoom';

let roomsInfo = [];

io.on('connection', (socket) => {
  // Join a room
  const { roomId, username } = socket.handshake.query;
  socket.join(roomId);

  let currentClient = { id: socket.id, username: username, roomID: roomId };

  // Get all the connected users
  if (roomsInfo.filter((room) => room.name === roomId).length > 0) {
    roomsInfo.map((room) => {
      if (room.name === roomId) {
        room.connectedClients.push(currentClient);
      }
    });
  } else {
    roomsInfo = [
      ...roomsInfo,
      {
        name: roomId,
        connectedClients: [currentClient],
      },
    ];
  }

  io.in(roomId).emit(
    USER_ENTERED,
    roomsInfo.find((room) => room.name === roomId)
  );

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on('disconnect', () => {
    io.in(roomId).emit(USER_LEFT_ROOM, socket.id);
    roomsInfo.map((room, index) => {
      if (room.name === roomId) {
        room.connectedClients = room.connectedClients.filter((client) => client.id !== socket.id);

        // If the room is empty, it is deleted
        if (room.connectedClients.length === 0) {
          roomsInfo.splice(index, 1);
        }
      }
    });
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
