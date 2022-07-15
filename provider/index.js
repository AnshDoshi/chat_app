const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});

const PORT = 3001;

io.on("connection", (socket) => {
  console.log("connection established");
  console.log(`id ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`socket id => ${socket.id} room id => ${data}`);
  });
  socket.on("send_message", (data) => {
    console.log({ data });
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log("SERVER RUNNING", "hello");
});
