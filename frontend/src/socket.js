import { io } from "socket.io-client";

const socket = io("https://colabboard.onrender.com", {
  autoConnect: false,
});

export default socket;
