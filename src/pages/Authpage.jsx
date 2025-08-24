import React, { useState } from "react";
import "../css/authcss.css";
import Darkmodetoggle from "../components/Darkmodetoggle";

function Authpage() {
  const [payload, setPayload] = useState({});
  const [darkMode, setdarkMode] = useState(true);
  const [islogin, setislogin] = useState(true);

  return (
    <div
      className={`w-full h-full flex flex-col ${
        darkMode ? "bg-black/90" : "bg-white/90"
      }`}
    >
      <Darkmodetoggle darkMode={darkMode} setdarkMode={setdarkMode} />
      <div className="flex flex-1 justify-center items-center">
        <div
          className={`text-white w-[28vw] h-[65vh] border ${
            darkMode
              ? "bg-gray-900/10 border-white/25"
              : "bg-white border-black/25"
          } rounded-lg flex flex-col justify-start items-center gap-y-6`}
        >
          <span
            className={`pt-3 text-3xl anton-regular ${
              darkMode ? "text-white" : "text-black/70"
            }`}
          >
            Welcome Back
          </span>

          {!islogin && (
            <div
              className={`w-[85%] h-12 border rounded-lg ${
                darkMode ? "border-white/30" : "border-black/30"
              }`}
            >
              <input
                className={`outline-none w-full h-full py-2 px-6 nunito-regular ${
                  darkMode
                    ? "text-white placeholder-white/50 bg-transparent"
                    : "text-black/50 placeholder-black/50 bg-transparent"
                }`}
                placeholder="User Name"
                type="text"
              />
            </div>
          )}

          <div
            className={`w-[85%] h-12 border rounded-lg ${
              darkMode ? "border-white/30" : "border-black/30"
            }`}
          >
            <input
              className={`outline-none w-full h-full py-2 px-6 nunito-regular ${
                darkMode
                  ? "text-white placeholder-white/50 bg-transparent"
                  : "text-black/50 placeholder-black/50 bg-transparent"
              }`}
              placeholder="Email Address"
              type="email"
            />
          </div>

          <div
            className={`w-[85%] h-12 border rounded-lg ${
              darkMode ? "border-white/30" : "border-black/30"
            }`}
          >
            <input
              className={`outline-none w-full h-full py-2 px-6 nunito-regular ${
                darkMode
                  ? "text-white placeholder-white/50 bg-transparent"
                  : "text-black/50 placeholder-black/50 bg-transparent"
              }`}
              placeholder="Password"
              type="password"
            />
          </div>

          <button
            className={`w-[85%] h-10 anton-regular rounded-lg p-2 border ${
              darkMode
                ? "text-white border-white/30 hover:bg-white hover:text-orange-400"
                : "bg-blue-400"
            }`}
          >
            {islogin ? "Sign In" : "Singn Up"}
          </button>

          {islogin ? (
            <div>
              <span className={`${darkMode ? "text-white" : "text-black"}`}>
                Don't you have an account?{" "}
              </span>
              <span
                className={`${darkMode ? "text-orange-400" : "text-blue-400"} cursor-pointer`}
                onClick={() => setislogin(false)}
              >
                Signup
              </span>
            </div>
          ) : (
            <div>
              <span className={`${darkMode ? "text-white" : "text-black"}`}>
                Do you have an account?{" "}
              </span>
              <span
                className={`${darkMode ? "text-orange-400" : "text-blue-400"} cursor-pointer`}
                onClick={() => setislogin(true)}
              >
                Signin
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authpage;
