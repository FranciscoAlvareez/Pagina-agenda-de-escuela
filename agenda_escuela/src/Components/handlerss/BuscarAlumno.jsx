import React, { useState } from "react";

function BuscarAlumno() {
  const [ci, setCi] = useState("");
  const [alumno, setAlumno] = useState(null);
  const [error, setError] = useState("");

  const handleBuscar = async () => {
    try {
      const response = await fetch(`http://localhost:5000/alumnos/${ci}`);
      const data = await response.json();

      if (response.ok) {
        setAlumno(data);
        setError("");
      } else {
        setAlumno(null);
        setError(data.error);
      }
    } catch (err) {
      setError("Error de red: " + err.message);
    }
  };

  return (
    <div>
      <h1>Buscar Alumno</h1>
      <input
        type="text"
        placeholder="Cédula de identidad"
        value={ci}
        onChange={(e) => setCi(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {alumno && (
        <div>
          <h2>Información del Alumno:</h2>
          <p>Nombre: {alumno.nombre}</p>
          <p>Apellido: {alumno.apellido}</p>
          <p>Fecha de Nacimiento: {alumno.fecha_nacimiento}</p>
          <p>Teléfono: {alumno.telefono}</p>
          <p>Email: {alumno.email}</p>
        </div>
      )}
    </div>
  );
}

export default BuscarAlumno;
