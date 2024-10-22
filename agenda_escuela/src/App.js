import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./Views/Login";
import React from "react";
import Home from "./Views/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
