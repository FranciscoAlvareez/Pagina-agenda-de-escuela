import React, { useState } from "react";

const ClassForm = ({ instructors, students, onSubmit }) => {
  const [className, setClassName] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedTurn, setSelectedTurn] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [error, setError] = useState("");

  const turns = ["Mañana", "Tarde", "Noche"];

  const handleSubmit = (e) => {
    e.preventDefault();
    const instructorConflict = instructors.some(
      (instructor) =>
        instructor.name === selectedInstructor &&
        instructor.turn === selectedTurn
    );
    const studentConflict = selectedStudents.some((student) =>
      students.some((s) => s.name === student && s.turn === selectedTurn)
    );

    if (instructorConflict) {
      setError("El instructor ya tiene una clase en este turno.");
      return;
    }

    if (studentConflict) {
      setError("Un alumno ya está inscrito en otra clase en este turno.");
      return;
    }

    onSubmit({
      className,
      instructor: selectedInstructor,
      turn: selectedTurn,
      students: selectedStudents,
    });

    setClassName("");
    setSelectedInstructor("");
    setSelectedTurn("");
    setSelectedStudents([]);
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
        <label>Alumnos:</label>
        <select
          multiple
          value={selectedStudents}
          onChange={(e) =>
            setSelectedStudents(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          {students.map((student) => (
            <option key={student.name} value={student.name}>
              {student.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ClassForm;
