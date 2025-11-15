import { useEffect, useState } from "react";
import socket from "../src/socket";

export default function useGetChats(roomId) {
  const [chatMsg, setChatMsg] = useState([]);

  useEffect(() => {
    const getmsg = (msg) => {
      setChatMsg((prev) => [...prev, msg]);
    };

    socket.on("get-messages", getmsg);

    return () => socket.off("get-messages", getmsg);
  }, []);

  return chatMsg;
}
