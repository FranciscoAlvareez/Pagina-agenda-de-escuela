import React, { useState } from "react";

const ClassForm = ({ instructors, onSubmit }) => {
  const [className, setClassName] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedTurn, setSelectedTurn] = useState("");
  const [date, setDate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isGroupClass, setIsGroupClass] = useState(false);
  const [activity, setActivity] = useState("");
  const [level, setLevel] = useState("");
  const [error, setError] = useState("");

  const turns = ["Mañana", "Tarde", "Noche"];
  const activities = ["Snowboard", "Esquí", "Patinaje"];
  const levels = ["Principiante", "Intermedio", "Avanzado"];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar datos
    if (
      !className ||
      !selectedTurn ||
      !date ||
      !capacity ||
      !activity ||
      !level
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (isNaN(capacity) || capacity <= 0) {
      setError("El número de cupos debe ser un número positivo.");
      return;
    }

    onSubmit({
      className,
      turn: selectedTurn,
      date,
      capacity: parseInt(capacity),
      isGroupClass,
      activity,
      level,
    });

    // Limpiar formulario
    setClassName("");
    setSelectedInstructor("");
    setSelectedTurn("");
    setDate("");
    setCapacity("");
    setIsGroupClass(false);
    setActivity("");
    setLevel("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar o Modificar Clase</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Nombre de la Clase:</label>
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Instructor:</label>
        <select
          value={selectedInstructor}
          onChange={(e) => setSelectedInstructor(e.target.value)}
          required
        >
          <option value="">Seleccione un instructor</option>
          {instructors.length === 0 ? (
            <option value="">Cargando instructores...</option>
          ) : (
            instructors.map((instructor) => (
              <option key={instructor.name} value={instructor.name}>
                {instructor.name}
              </option>
            ))
          )}
        </select>
      </div>
      <div>
        <label>Turno:</label>
        <select
          value={selectedTurn}
          onChange={(e) => setSelectedTurn(e.target.value)}
          required
        >
          <option value="">Seleccione un turno</option>
          {turns.map((turn) => (
            <option key={turn} value={turn}>
              {turn}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Fecha:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Cupos:</label>
        <input
          type="number"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isGroupClass}
            onChange={(e) => setIsGroupClass(e.target.checked)}
          />
          Clase Grupal
        </label>
      </div>
      <div>
        <label>Actividad:</label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          required
        >
          <option value="">Seleccione una actividad</option>
          {activities.map((act) => (
            <option key={act} value={act}>
              {act}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Nivel:</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        >
          <option value="">Seleccione un nivel</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ClassForm;
