import React, { useEffect, useRef, useState } from "react";
import Boardcanvas from "../components/boardComponents/Boardcanvas";
import Toolbar from "../components/boardComponents/Toolbar";
import Undoredo from "../components/boardComponents/Undoredo";
import { useParams } from "react-router-dom";
import socket from "../socket";
import { useCursormove } from "../../hooks/useCursorMove";
import Cursormovement from "../components/boardComponents/Cursormovement";

function Board() {
  const [lockBoard, setLockBoard] = useState(false);
  const { roomId, userId } = useParams();

  const boardRef = useRef();

  const cursorRef = useCursormove(userId, roomId);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      console.log("Connected! Joining room:", roomId);
      socket.emit("join-room", roomId);
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
  });

  return (
    <div className="w-screen h-screen relative">
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
    </div>
  );
}

export default Board;
