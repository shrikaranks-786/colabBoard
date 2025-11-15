import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import useGetchats from "../../../hooks/useGetchats";
import socket from "../../socket";

function Chat({ roomId }) {
  const [msg, setMsg] = useState("");

  const chatMsg = useGetchats() || [];

  const handleSendmsg = () => {
    if (!msg || msg === "") return;

    socket.emit("send-msg", roomId, msg);

    setMsg("");
  };

  return (
    <div className="w-[22vw] h-[70vh] rounded-md shadow-lg border border-gray-300 absolute flex justify-center overflow-hidden">
      <div className="max-h-[80%] overflow-auto w-[90%] no-scrollbar">
        {chatMsg?.map((msg) => {
          return (
            <div
              className={`w-full h-auto flex flex-col gap-y-1 ${
                msg.userId === socket.id ? "items-end" : "items-start"
              }`}
            >
              {msg.userName}
              <div className="max-w-[80%] max-h-20 bg-teal-400 text-white py-1 px-2 rounded-md ">
                {msg.msg}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-[90%] min-h-10 border border-gray-500/40 rounded-md absolute bottom-5 flex justify-between items-center p-2">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendmsg();
          }}
          className="outline-none w-[95%] h-full pr-3"
        />
        <IoMdSend className="cursor-pointer" onClick={() => handleSendmsg()} />
      </div>
    </div>
  );
}

export default Chat;
