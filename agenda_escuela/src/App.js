import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./Views/Login";
import React from "react";
import Home from "./Views/Home";
import Card from "./Components/Card";
function App() {
  return (
    <div>
      <Card title={"h"} description={"hola como estas"} />
      <Card title={"h"} description={"hola como estas"} />
      <Card title={"h"} description={"hola como estas"} />
    </div>
  );
}
export default App;
