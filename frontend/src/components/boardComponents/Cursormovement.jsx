import React from "react";

export default function Cursormovement({ cursorRef, users }) {
  return (
    <>
      {users.map((userId) => (
        <div
          key={userId}
          ref={(el) => {
            if (el) cursorRef.current[userId] = el;
          }}
          className="fixed bg-red-500 text-white px-2 py-1 rounded"
          style={{ left: 0, top: 0 }}
        >
          {userId}
        </div>
      ))}
    </>
  );
}
