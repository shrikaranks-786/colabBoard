import React, { useState } from "react";

function Authpage() {
  const [darkMode, setdarkMode] = useState(true);
  return (
    <div className="w-full h-full bg-black/90 flex justify-center items-center">
      {/* sign/signup block */}
      <div
        className={`text-white w-[28vw] h-[65vh] ${
          darkMode ? "bg-gray-900/10 border border-white/25" : "bg-white"
        } rounded-lg`}
      ></div>
    </div>
  );
}

export default Authpage;
