import { useEffect, useRef } from "react";
import socket from "../src/socket";

export const useCursormove = (userId, roomId) => {
  const cursorRef = useRef({});

  useEffect(() => {
    const handleMove = (e) => {
      socket.emit("cursor-move", {
        userId,
        roomId,
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleCursorUpdate = (data) => {
      const el = cursorRef.current[data.userId];
      if (!el) return;
      el.style.left = `${data.x}px`;
      el.style.top = `${data.y}px`;
    };

    window.addEventListener("mousemove", handleMove);
    socket.on("cursor-update", handleCursorUpdate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      socket.off("cursor-update", handleCursorUpdate);
    };
  }, []);

  return cursorRef;
};
