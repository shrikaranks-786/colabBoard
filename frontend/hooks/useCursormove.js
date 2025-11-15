import { useEffect, useRef } from "react";
import socket from "../src/socket";

export const useCursormove = (userId, roomId) => {
  const cursorRef = useRef({});

  useEffect(() => {
    if (!userId || !roomId) return;

    const handleMove = (e) => {
      socket.emit("cursor-move", {
        userId,
        roomId,
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleCursorUpdate = (data) => {
      if (data.userId === userId) return;
      const el = cursorRef.current[data.userId];
      console.log(el, "element for cursor", data.userId);
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
  }, [userId, roomId]);

  return cursorRef;
};
