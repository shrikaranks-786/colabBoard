import React from "react";

export default function Cursormovement({ cursorRef, users }) {
  return (
    <>
      {users.map((userid) => (
        <div
          key={userid}
          ref={(el) => {
            cursorRef.current[userid] = el;
          }}
          className="fixed bg-red-500 text-white px-2 py-1 rounded w-auto h-auto"
          style={{ left: 0, top: 0 }}
        >
          {userid}
        </div>
      ))}
    </>
  );
}
