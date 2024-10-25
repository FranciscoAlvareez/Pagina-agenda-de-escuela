import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Register from "./Views/Register";
import React from "react";
import Home from "./Views/Home";
import Card from "./Components/Card";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
