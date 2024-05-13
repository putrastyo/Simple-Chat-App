import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const messages = [];

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("message", (message) => {
    io.emit("message", message);
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
