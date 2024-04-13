const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

const PORT = 8080;

const messages = [];

io.on("connection", (socket) => {
  io.emit("get_messages", messages);
  console.log("Usuário conectado", socket.id);

  socket.on("disconnect", () => {
    console.log("Usuário desconectado", socket.id);
  });

  socket.on("set_username", (username) => {
    socket.data.username = username;
  });

  socket.on("message", (text) => {
    io.emit("receive_message", {
      text,
      userId: socket.id,
      user: socket.data.username,
    });
    const message = {
      text,
      userId: socket.id,
      user: socket.data.username,
      dateTime: new Date(),
    };
    messages.push(message);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
