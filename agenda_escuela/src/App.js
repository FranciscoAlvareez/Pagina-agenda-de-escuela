import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Forms from "./Components/Forms/index.jsx";
import React from "react";
import Home from "./Views/Home";
import NavBar from "./Components/NavBar/NavBar.jsx";
import { useLocation } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes /> {/* Componente que maneja las rutas y el NavBar */}
    </BrowserRouter>
  );
}

// Componente que maneja las rutas y el NavBar
const AppRoutes = () => {
  const location = useLocation(); // Ahora se usa aquí, dentro de un contexto de Router

  // Define las rutas en las que NO quieres mostrar el NavBar
  const noNavBarRoutes = ["/login", "/register"];

  return (
    <div>
      {/* Renderiza NavBar solo si la ruta actual no está en noNavBarRoutes */}
      {!noNavBarRoutes.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Forms title={"Login"} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Forms title={"Login"} />} />
        <Route path="/register" element={<Forms title={"Register"} />} />
      </Routes>
    </div>
  );
};

export default App;
