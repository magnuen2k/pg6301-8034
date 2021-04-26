const app = require("./app");
const { wsServer } = require("./websocket");

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`Started on http://localhost:${port}`);
  server.on("upgrade", (req, socket, head) => {
    wsServer.handleUpgrade(req, socket, head, (socket) => {
      wsServer.emit("connection", socket, req);
    });
  });
});
