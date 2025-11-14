import { Redo2, Undo2 } from "lucide-react";
import React from "react";

function Undoredo({ undo, redo }) {
  return (
    <div className="w-20 rounded-md h-10 shadow-lg flex justify-between items-center p-2 text-gray-600">
      <Undo2 onClick={() => undo()} className="cursor-pointer" size={20} />
      <Redo2 onClick={() => redo()} className="cursor-pointer" size={20} />
    </div>
  );
}

export default Undoredo;
