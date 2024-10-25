import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
function Register() {
  // Estados para almacenar el nombre de usuario y contraseña
  const [name, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [ci, setCi] = useState("");
  const [contactnumber, setContactnumber] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [dateBirth, setDatebirth] = useState("");
  const navigate = useNavigate();
  // Función para manejar el envío del formulario
  /*
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica para enviar los datos al servidor
    console.log("Nombre:", name);

    */
   const goTo=()=>{
    navigate("/home");
   }
    return (
      <div className="Login">
        <h2>Registro</h2>
        <form>
          <input type="text" placeholder="Nombre" className="input"></input>
          <input
            type="password"
            placeholder="Constraseña"
            className="input"
          ></input>
          <input type="text" placeholder="Apellido" className="input"></input>
          <input
            type="number"
            placeholder="Numero de contacto"
            className="input"
          ></input>
          <input type="text" placeholder="Mail" className="input"></input>
          <input
            type="Date"
            placeholder="Fecha de Nacimiento"
            className="input"
          ></input>
        </form>
        <button onClick={goTo}>Registrar</button>
      </div>
    );
  };


export default Register;
