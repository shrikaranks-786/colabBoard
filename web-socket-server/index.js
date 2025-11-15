import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const rooms = new Map();

io.on("connection", (user) => {
  console.log(`New user connected ${user.id}`);

  user.on("join-room", (roomid) => {
    user.join(roomid);

    if (!rooms.has(roomid)) rooms.set(roomid, new Set());

    const userId = user.id;

    rooms.get(roomid).add(userId);

    const usersinRoom = Array.from(rooms.get(roomid));

    user.emit("users-in-room", usersinRoom);

    console.log(`User ${user.id} joined room: ${roomid}`);
  });

  user.on("cursor-move", (data) => {
    const { roomId, userId, x, y } = data;
    user.to(roomId).emit("cursor-update", { userId, x, y });
  });

  user.on("draw", (strokeData, roomId) => {
    user.to(roomId).emit("draw", strokeData);
  });
});

server.listen("8000", () => {
  console.log("websocket server listining");
});
