import React from "react";
import { Route, Routes } from "react-router-dom";
import Board from "./pages/Board";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/board/:userId/:roomId" element={<Board />} />
      </Routes>
    </div>
  );
}

export default App;
