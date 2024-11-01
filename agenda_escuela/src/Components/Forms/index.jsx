import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./index.module.css"

function Forms({ title }) {
  // Estados para almacenar los valores de los inputs
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [ci, setCi] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [dateBirth, setDateBirth] = useState("");

  const navigate = useNavigate();
  
  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para enviar los datos
    console.log("Formulario enviado:", { name, lastname, ci, contactnumber, password, mail, dateBirth });
    navigate("/home");
  };

  return (
    // Formulario de Login
    <>
    <img src="agenda_escuela\src\logoProyecto.png" alt="logo" />
    <div className={classes.Login}>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Mail"
          className={classes.input}
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className={classes.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {title === "Register" && (
          <>
            <input
              type="text"
              placeholder="Nombre"
              className={classes.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Apellido"
              className={classes.input}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              type="number"
              placeholder="Numero de contacto"
              className={classes.input}
              value={contactnumber}
              onChange={(e) => setContactnumber(e.target.value)}
            />
            <input
              type="date"
              placeholder="Fecha de Nacimiento"
              className={classes.input}
              value={dateBirth}
              onChange={(e) => setDateBirth(e.target.value)}
            />
          </>
        )}
        <button type="submit">{title}</button>
      </form>
      <div className="link-container">
        {title === "Login" ? (
          <p>
            ¿Aún no estás registrado?{" "}
            <Link to="/register">Regístrate</Link>
          </p>
        ) : (
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login">Inicia sesión</Link>
          </p>
        )}
      </div>
    </div>
    </>
  );
}

export default Forms;
