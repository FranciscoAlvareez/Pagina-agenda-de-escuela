import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Forms from "./Components/Forms/index.jsx";
import React from "react";
import Home from "./Views/Home";
import NavBar from "./Components/NavBar/NavBar.jsx";
import Instrucciones from "./Views/AboutUs.jsx"; // Importa el componente Instrucciones
import Inscripciones from "./Views/Inscripciones.jsx";
import { useLocation } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes /> {/* Componente que maneja las rutas y el NavBar */}
    </BrowserRouter>
  );
}

const AppRoutes = () => {
  const location = useLocation();
  const noNavBarRoutes = ["/login", "/register"];

  return (
    <div>
      {!noNavBarRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Forms title={"Login"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Forms title={"Login"} />} />
        <Route path="/register" element={<Forms title={"Register"} />} />
        <Route path="/instrucciones" element={<Instrucciones />} />
        <Route path="/inscripciones" element={<Inscripciones />} />
      </Routes>
    </div>
  );
};

export default App;
