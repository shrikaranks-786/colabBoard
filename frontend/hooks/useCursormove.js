import { useEffect, useRef } from "react";
import socket from "../src/socket";

export const useCursormove = (userId) => {
  const cursorRef = useRef({});

  useEffect(() => {
    const handleCursormovement = (e) => {
      socket.emit("cursor-move", {
        userId,
        x: e.clientX,
        y: e.clientY,
      });
    };

    socket.on("cursor-update", (data) => {
      const elem = cursorRef.current[data.userId];

      if (!elem) return;

      el.style.left = `${data.x + 10}px`;
      el.style.top = `${data.y + 10}px`;
    });

    window.addEventListener("mousemove", handleCursormovement);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      socket.off("cursor-update");
    };
  }, [userId]);

  return cursorRef;
};
