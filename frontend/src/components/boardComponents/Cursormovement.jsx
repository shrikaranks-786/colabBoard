import { BsCursorFill } from "react-icons/bs";
import socket from "../../socket";
import { getRandomColor } from "../../../helper/randomcolor";
import { useState, useEffect } from "react";

export default function Cursormovement({ cursorRef, users }) {
  const [userColors, setUserColors] = useState({});
  const [usedColors, setUsedColors] = useState(new Set());

  useEffect(() => {
    const newColors = { ...userColors };
    const newUsed = new Set(usedColors);

    users.forEach((u) => {
      if (u.userId !== socket.id && !newColors[u.userId]) {
        const color = getRandomColor(newUsed, setUsedColors);
        newColors[u.userId] = color;
        newUsed.add(color);
      }
    });

    setUserColors(newColors);
    setUsedColors(newUsed);
  }, [users]);

  return (
    <>
      {users
        .filter((u) => u.userId !== socket.id)
        .map((u) => (
          <div
            key={u.userId}
            ref={(el) => {
              if (el) cursorRef.current[u.userId] = el;
            }}
            className="absolute pointer-events-none transition-all duration-150 ease-out z-50"
            style={{ left: 0, top: 0 }}
          >
            <div className="relative">
              <BsCursorFill
                className="w-5 h-5 drop-shadow-lg transition-transform"
                style={{
                  color: userColors[u.userId],
                  transform: "rotate(270deg)"
                }}
              />

              <div
                className="absolute top-6 left-2 px-3 py-1.5 rounded-full text-white text-sm font-medium shadow-lg whitespace-nowrap backdrop-blur-sm animate-fade-in"
                style={{
                  backgroundColor: userColors[u.userId],
                  boxShadow: `0 4px 12px ${userColors[u.userId]}40`
                }}
              >
                {u.userName}
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
