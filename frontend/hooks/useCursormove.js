import { useEffect, useRef } from "react";
import socket from "../src/socket";
import { useState } from "react";

export const useCursormove = (roomId) => {
  const cursorRef = useRef({});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const setuserid = () => {
      setUserId(socket.id);
    };
    socket.on("connect", setuserid);

    return () => {
      socket.off("connect", setuserid);
    };
  }, [roomId]);

  useEffect(() => {
    if (!userId || !roomId) return;

    const handleMove = (e) => {
      
      const myCursor = cursorRef.current[userId];
      if (myCursor) {
        myCursor.style.left = `${e.clientX}px`;
        myCursor.style.top = `${e.clientY}px`;
      }

      socket.emit("cursor-move", {
        userId,
        roomId,
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [userId, roomId]);

  useEffect(() => {
    if (!userId || !roomId) return;

    console.log(userId, roomId);

    const handleCursorUpdate = (data) => {
      if (data.userId === userId) return;

      const el = cursorRef.current[data.userId];
      console.log(el, "element for cursor", data.userId);

      if (!el) return;

      el.style.left = `${data.x}px`;
      el.style.top = `${data.y}px`;
    };

    socket.on("cursor-update", handleCursorUpdate);

    return () => {
      socket.off("cursor-update", handleCursorUpdate);
    };
  }, [userId, roomId]);

  return cursorRef;
};
