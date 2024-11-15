import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // CSS personalizado

const Home = () => {
  return (
    <div className="allpage">
      <div className="home-container">
        <h1>Bienvenido a la Escuela de Deportes de Nieve</h1>
        <p>
          Únete a nuestra escuela para disfrutar de actividades emocionantes
          como Snowboard, Ski y Moto de Nieve.
        </p>

        <h2>Actividades Disponibles</h2>
        <ul>
          <li>
            <Link to="/aboutus">Sobre la escuela y nuestras actividades</Link>
          </li>
          <li>
            <Link to="/inscripciones">¡Inscríbete ahora!</Link>
          </li>
        </ul>

        <h2>Servicios Adicionales</h2>
        <p>
          Ofrecemos alquiler de equipos, desde antiparras hasta esquíes, para
          asegurar que tengas todo lo necesario para disfrutar de las
          actividades.
        </p>
      </div>
    </div>
  );
};

export default Home;
