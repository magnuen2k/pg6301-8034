const ws = require("ws");

const wsServer = new ws.Server({ noServer: true });
const sockets = new Map();
wsServer.on("connection", (socket) => {
  socket.on("message", (username) => {
    sockets.set(username, socket);
  });
});

module.exports = { wsServer, sockets };
