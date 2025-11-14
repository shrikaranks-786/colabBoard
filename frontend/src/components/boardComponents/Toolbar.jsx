import React from "react";
import { LockKeyhole, LockKeyholeOpen } from "lucide-react";

function Toolbar({ lockBoard, setLockBoard }) {
  return (
    <div className="w-[30%] rounded-md h-10 shadow-lg flex justify-start items-center p-2 text-gray-600 space-x-2">
      <div
        onClick={() => setLockBoard((prev) => !prev)}
        className="cursor-pointer"
      >
        {lockBoard ? (
          <LockKeyholeOpen size={20} />
        ) : (
          <LockKeyhole size={20}/>
        )}
      </div>
      <div className="h-full w-px rounded-md bg-gray-300"></div>
    </div>
  );
}

export default Toolbar;
