import React, { useState, useEffect } from "react";
import "./AdminPage.css";

const AdminPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [turns, setTurns] = useState([]);
  const [activities, setActivities] = useState([]);
  const [classes, setClasses] = useState([]);

  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedTurn, setSelectedTurn] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [isGroupClass, setIsGroupClass] = useState(false);
  const [capacity, setCapacity] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Funciones para obtener datos del backend
  const fetchInstructors = async () => {
    try {
      const response = await fetch("http://localhost:5000/instructores");
      const data = await response.json();
      setInstructors(data);
    } catch (error) {
      console.error("Error al obtener los instructores:", error);
    }
  };

  const fetchTurns = async () => {
    try {
      const response = await fetch("http://localhost:5000/turnos");
      const data = await response.json();
      setTurns(data);
    } catch (error) {
      console.error("Error al obtener los turnos:", error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch("http://localhost:5000/actividades");
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error("Error al obtener las actividades:", error);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchInstructors();
    fetchTurns();
    fetchActivities();
  }, []);

  // Manejar la creación de clases y envío al backend
  const handleAddClass = async (e) => {
    e.preventDefault();

    // Validaciones
    if (
      !selectedInstructor ||
      !selectedTurn ||
      !selectedActivity ||
      !date ||
      !capacity
    ) {
      setError("Todos los campos son obligatorios.");
      setSuccess("");
      return;
    }

    if (isNaN(capacity) || capacity <= 0) {
      setError("El número de cupos debe ser un número positivo.");
      setSuccess("");
      return;
    }

    const newClass = {
      instructor_id: selectedInstructor,
      turno_id: selectedTurn,
      actividad_id: selectedActivity,
      fecha: date,
      cupos: parseInt(capacity),
      es_grupal: isGroupClass,
    };

    try {
      const response = await fetch("http://localhost:5000/agregar_clase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newClass),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message);
        setError("");

        // Actualizar lista local de clases
        setClasses((prevClasses) => [...prevClasses, newClass]);

        // Limpiar campos
        setSelectedInstructor("");
        setSelectedTurn("");
        setSelectedActivity("");
        setIsGroupClass(false);
        setCapacity("");
        setDate("");
      } else {
        const errorResult = await response.json();
        setError(errorResult.error || "Error al agregar la clase.");
        setSuccess("");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
      setSuccess("");
      console.error("Error al enviar la clase:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Administración</h1>
      <form onSubmit={handleAddClass}>
        <h2>Agregar Clase</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        {/* Instructores */}
        <div>
          <label>Instructor:</label>
          <select
            value={selectedInstructor}
            onChange={(e) => setSelectedInstructor(e.target.value)}
            required
          >
            <option value="">Seleccione un instructor</option>
            {instructors.map((instructor) => (
              <option key={instructor.ci} value={instructor.ci}>
                {instructor.nombre} {instructor.apellido}
              </option>
            ))}
          </select>
        </div>

        {/* Turnos */}
        <div>
          <label>Turno:</label>
          <select
            value={selectedTurn}
            onChange={(e) => setSelectedTurn(e.target.value)}
            required
          >
            <option value="">Seleccione un turno</option>
            {turns.map((turn) => (
              <option key={turn.id} value={turn.id}>
                {turn.turno} - {turn.hora_inicio} a {turn.hora_fin}
              </option>
            ))}
          </select>
        </div>

        {/* Actividades */}
        <div>
          <label>Actividad:</label>
          <select
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            required
          >
            <option value="">Seleccione una actividad</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.descripcion} - ${activity.costo} - Edad mínima:{" "}
                {activity.edad_minima}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label>Fecha:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Capacidad */}
        <div>
          <label>Cupos:</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </div>

        {/* Clase grupal */}
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

        <button type="submit">Guardar Clase</button>
      </form>

      <h2>Clases Existentes</h2>
      <table>
        <thead>
          <tr>
            <th>Instructor</th>
            <th>Turno</th>
            <th>Actividad</th>
            <th>Fecha</th>
            <th>Cupos</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem, index) => (
            <tr key={index}>
              <td>
                {
                  instructors.find((i) => i.ci === classItem.instructor_id)
                    ?.nombre
                }{" "}
                {
                  instructors.find((i) => i.ci === classItem.instructor_id)
                    ?.apellido
                }
              </td>
              <td>{turns.find((t) => t.id === classItem.turno_id)?.turno}</td>
              <td>
                {
                  activities.find((a) => a.id === classItem.actividad_id)
                    ?.descripcion
                }
              </td>
              <td>{classItem.fecha}</td>
              <td>{classItem.cupos}</td>
              <td>{classItem.es_grupal ? "Grupal" : "Individual"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
