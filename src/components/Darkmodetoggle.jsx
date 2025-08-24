import React from "react";

function Darkmodetoggle({darkMode,setdarkMode}) {
  return (
    <div className="flex justify-end py-3 px-16">
      <button
        className={`w-20 h-10 p-2 flex items-center rounded-3xl ${
          darkMode ? "bg-black/40" : "bg-white border border-black/50"
        }`}
        img={"../assets/clouds"}
        onClick={() => setdarkMode((prev) => !prev)}
      >
        <div
          className={`w-7 h-7 rounded-full transition-transform duration-400 ease-in-out ${
            darkMode ? "bg-white translate-x-9" : "bg-yellow-400 translate-x-0 border-2 border-orange-400"
          }`}
        ></div>
      </button>
    </div>
  );
}

export default Darkmodetoggle;
