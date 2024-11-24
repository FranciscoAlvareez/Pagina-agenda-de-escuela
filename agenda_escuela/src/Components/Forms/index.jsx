import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios"; // Importa Axios
import classes from "./index.module.css";
import logoProyecto from "../../assets/Icons/logoProyecto.png";

function Forms({ title }) {
  // Definir estados del formulario
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [ci, setCi] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [dateBirth, setDateBirth] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones
    if (title === "Login" && (!mail || !password)) {
      alert("Por favor, ingresa tu correo y contraseña.");
      return;
    }
    if (
      title === "Register" &&
      (!name || !lastname || !ci || !contactnumber || !password || !mail || !dateBirth)
    ) {
      alert("Por favor, completa todos los campos para registrarte.");
      return;
    }

    try {
      if (title === "Register") {
        // Registro de usuario
        const data = { name, lastname, ci, contactnumber, password, mail, dateBirth };
        const response = await axios.post("http://localhost:5000/register", data);

        alert("Usuario registrado con éxito");
        navigate("/login"); // Redirigir al login tras registrarse
      } else if (title === "Login") {
        // Login de usuario
        const response = await axios.post("http://localhost:5000/login", {
          mail,
          password,
        });

        // Extrae y guarda el token en localStorage
        const { token } = response.data;
        localStorage.setItem("token", token); // Guardar el token

        alert("Inicio de sesión exitoso");
        navigate("/home"); // Redirigir a la página principal
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.error || "Error en el servidor");
    }
  };

  return (
    <div className="container">
      <div className="image">
        <img src={logoProyecto} alt="logo" />
      </div>
      <div className={classes.Login}>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>
          {/* Campos comunes para Login y Register */}
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

          {/* Campos adicionales para Register */}
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
                type="text"
                placeholder="Cédula de Identidad"
                className={classes.input}
                value={ci}
                onChange={(e) => setCi(e.target.value)}
              />
              <input
                type="text"
                placeholder="Número de contacto"
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

          <button className="registerButton" type="submit">
            {title}
          </button>
        </form>

        {/* Links para cambiar entre Login y Register */}
        <div className="link-container">
          {title === "Login" ? (
            <p>
              ¿Aún no estás registrado? <Link to="/register">Regístrate</Link>
            </p>
          ) : (
            <p>
              ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Forms;
