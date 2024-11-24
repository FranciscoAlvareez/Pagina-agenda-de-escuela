import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Para decodificar el token JWT
import "./Inscripciones.css";


const Inscripciones = () => {
  const [activities, setActivities] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [isGroupClass, setIsGroupClass] = useState(false);
  const [ciAlumno, setCiAlumno] = useState(null);

  // Obtener el CI del token al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setCiAlumno(decoded.ci);
    }
  }, []);

  // Obtener datos iniciales (actividades, turnos, equipamientos)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const activitiesResponse = await axios.get("http://localhost:5000/actividades");
        setActivities(activitiesResponse.data);

        const shiftsResponse = await axios.get("http://localhost:5000/turnos");
        setShifts(shiftsResponse.data);

        const equipmentsResponse = await axios.get("http://localhost:5000/equipamiento");
        setEquipments(equipmentsResponse.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      id_clase: selectedActivity,
      ci_alumno: ciAlumno,
      id_turno: selectedShift,
      fecha_clase: new Date().toISOString().split("T")[0],
      es_grupal: isGroupClass,
      id_equipamiento: selectedEquipment || null, // Verifica si tiene un valor
      es_alquiler: 0, 
    };

    console.log("Datos enviados al backend:", data);

    try {
      const response = await axios.post("http://localhost:5000/inscribir", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert(response.data.message || "Inscripción realizada con éxito");
    } catch (error) {
      console.error("Error al inscribir:", error);
      alert(error.response?.data?.error || "Error al realizar la inscripción.");
    }
  };

  return (
    <div>
      <h1>Inscripciones</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Actividad:</label>
          <select
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
          >
            <option value="">Seleccione una actividad</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Turno:</label>
          <select value={selectedShift} onChange={(e) => setSelectedShift(e.target.value)}>
            <option value="">Seleccione un turno</option>
            {shifts.map((shift) => (
              <option key={shift.id} value={shift.id}>
                {shift.turno} - {shift.hora_inicio} a {shift.hora_fin}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Equipamiento:</label>
          <select
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
          >
            <option value="">Seleccione un equipamiento</option>
            {equipments.map((equipment) => (
              <option key={equipment.id} value={equipment.id}>
                {equipment.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={isGroupClass}
              onChange={(e) => setIsGroupClass(e.target.checked)}
            />
            Clase grupal
          </label>
        </div>

        <button type="submit">Inscribirse</button>
      </form>
    </div>
  );
};

export default Inscripciones;
