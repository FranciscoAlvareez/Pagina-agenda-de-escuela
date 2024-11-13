import React, { useState } from "react";

const activities = [
  { name: "Snowboard", cost: 100, ageRestriction: 12 },
  { name: "Ski", cost: 120, ageRestriction: 10 },
  { name: "Moto de Nieve", cost: 150, ageRestriction: 16 },
];

const shifts = ["De 9:00 a 11:00", "De 12:00 a 14:00", "De 16:00 a 18:00"];

const Inscripciones = () => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [isGroupClass, setIsGroupClass] = useState(false);

  const handleActivityChange = (e) => {
    setSelectedActivity(e.target.value);
  };

  const handleShiftChange = (e) => {
    setSelectedShift(e.target.value);
  };

  const handleClassTypeChange = (e) => {
    setIsGroupClass(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      selectedActivity,
      selectedShift,
      isGroupClass,
    });
  };

  return (
    <div>
      <h1>Inscripciones</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Actividad:</label>
          <select value={selectedActivity} onChange={handleActivityChange}>
            <option value="">Seleccione una actividad</option>
            {activities.map((activity) => (
              <option key={activity.name} value={activity.name}>
                {activity.name} - ${activity.cost} - Edad mínima:{" "}
                {activity.ageRestriction}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Turno:</label>
          <select value={selectedShift} onChange={handleShiftChange}>
            <option value="">Seleccione un turno</option>
            {shifts.map((shift) => (
              <option key={shift} value={shift}>
                {shift}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={isGroupClass}
              onChange={handleClassTypeChange}
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
