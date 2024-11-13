// NavBar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navBar">
      <div className="navBar-logo">
        <Link to="/home">MiSitio</Link>
      </div>
      <ul className={`navBar-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/instrucciones">Acerca de nosotros</Link>{" "}
        </li>

        <li>
          <Link to="/inscripciones">Inscripciones</Link>
        </li>
        <li>
          <Link to="/logout">Log Out</Link>
        </li>
      </ul>
      <button className="navBar-toggle" onClick={toggleMenu}>
        ☰
      </button>
    </nav>
  );
};

export default NavBar;
