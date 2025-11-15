import { useEffect, useRef } from "react";
import socket from "../src/socket";

export default function useDraggable(chatBoxRef, roomid) {
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = (e) => {
      if (!chatBoxRef.current) return;
      if (!chatBoxRef.current.contains(e.target)) return;

      dragging.current = true;

      const rect = chatBoxRef.current.getBoundingClientRect();

      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseMove = (e) => {
      if (!dragging.current) return;

      const x = e.clientX - offset.current.x;
      const y = e.clientY - offset.current.y;

      chatBoxRef.current.style.left = `${x}px`;
      chatBoxRef.current.style.top = `${y}px`;

      socket.emit("dragg-chat-box",x, y, roomid );
    };

    const handleMouseUp = () => {
      dragging.current = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [chatBoxRef]);

  useEffect(() => {
    const handleDrag = (x, y) => {
      chatBoxRef.current.style.left = `${x}px`;
      chatBoxRef.current.style.top = `${y}px`;
    };

    socket.on("get-chat-pos", handleDrag);

    return () => {
      socket.off("get-chat-pos", handleDrag);
    };
  }, [chatBoxRef]);
}
