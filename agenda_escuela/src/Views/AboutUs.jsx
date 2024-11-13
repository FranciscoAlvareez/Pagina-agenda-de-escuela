// AboutUs.jsx
import React from 'react';
import './AboutUs.css'; // Puedes agregar el CSS que prefieras aquí.

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>Sobre Nosotros</h1>
      <p>
        La UCU ha abierto una escuela de deportes de nieve, con el objetivo de ofrecer una experiencia única y ampliar la propuesta de actividades. En esta escuela, los estudiantes podrán disfrutar de actividades como snowboard, ski y moto de nieve.
      </p>
      <h2>Actividades</h2>
      <ul>
        <li><strong>Snowboard:</strong> $100 - Edad mínima: 12 años</li>
        <li><strong>Ski:</strong> $120 - Edad mínima: 10 años</li>
        <li><strong>Moto de Nieve:</strong> $150 - Edad mínima: 16 años</li>
      </ul>
      <h2>Turnos</h2>
      <ul>
        <li>De 9:00 a 11:00</li>
        <li>De 12:00 a 14:00</li>
        <li>De 16:00 a 18:00</li>
      </ul>
      <h2>Alquiler de Equipamiento</h2>
      <p>
        La escuela ofrece alquiler de equipo, desde antiparras, cascos, tablas de snowboard, esquíes, entre otros. Si un alumno alquila equipo, el costo de la clase será mayor.
      </p>
    </div>
  );
};

export default AboutUs;
