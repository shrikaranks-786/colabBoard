import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
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


io.on("connection",(user) => {
    console.log(`New user connected ${user.id}`)

    user.on("hellow",() => {
        user.emit("henlo","ediot")
    });
})

server.listen("8000", () => {
  console.log("websocket server listining");
});
