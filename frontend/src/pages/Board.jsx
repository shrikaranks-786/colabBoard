import React, { useEffect, useRef, useState } from "react";
import Boardcanvas from "../components/boardComponents/Boardcanvas";
import Toolbar from "../components/boardComponents/Toolbar";
import Undoredo from "../components/boardComponents/Undoredo";
import { useParams } from "react-router-dom";
import socket from "../socket";
import Cursormovement from "../components/boardComponents/Cursormovement";
import useCursormove from "../../hooks/useCursormove.js";
import Chat from "../components/boardComponents/Chatboard.jsx";
import useChatmove from "../../hooks/useChatmove.js";

function Board() {
  const [lockBoard, setLockBoard] = useState(false);
  const { roomId, userName } = useParams();

  const boardRef = useRef();
  const chatBoxref = useRef();

  const [users, setUsers] = useState([]);

  const cursorRef = useCursormove(roomId, users);
  useChatmove(chatBoxref);

  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      console.log("Connected! Joining room:", roomId);
      socket.emit("join-room", roomId, userName);
    };

    socket.on("connect", handleConnect);

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [roomId]);

  useEffect(() => {
    socket.on("users-in-room", (usersinRoom) => {
      setUsers(usersinRoom);
    });

    return () => {
      socket.off("users-in-room");
    };
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <div className="w-full h-auto flex justify-center absolute top-5">
        <Toolbar lockBoard={lockBoard} setLockBoard={setLockBoard} />
      </div>

      <Boardcanvas ref={boardRef} roomId={roomId} />

      <div className="h-auto absolute bottom-5 left-5">
        <Undoredo
          undo={() => boardRef.current?.undo()}
          redo={() => boardRef.current?.redo()}
        />
      </div>

      <Cursormovement cursorRef={cursorRef} users={users} />

      <Chat roomId={roomId} chatBoxref={chatBoxref} />
      
    </div>
  );
}

export default Board;
