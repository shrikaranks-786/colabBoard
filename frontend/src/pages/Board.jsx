import React, { useRef, useState } from "react";
import Boardcanvas from "../components/boardComponents/Boardcanvas";
import Toolbar from "../components/boardComponents/Toolbar";
import Undoredo from "../components/boardComponents/Undoredo";

function Board() {
  const [lockBoard, setLockBoard] = useState(false);

  const boardRef = useRef();

  return (
    <div className="w-screen h-screen relative">
      <div className="w-full h-auto flex justify-center absolute top-5">
        <Toolbar lockBoard={lockBoard} setLockBoard={setLockBoard} />
      </div>

      <Boardcanvas ref={boardRef} />

      <div className="h-auto absolute bottom-5 left-5">
        <Undoredo
          undo={() => boardRef.current?.undo()}
          redo={() => boardRef.current?.redo()}
        />
      </div>
    </div>
  );
}

export default Board;
