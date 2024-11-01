import React from "react";
import "../Card/Card.css";

function Card({ title, description, image }) {
  return (
    <div className="card">
      <label>Actividad</label>
      <img src={image} className="card-img-top" />
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}

export default Card;
