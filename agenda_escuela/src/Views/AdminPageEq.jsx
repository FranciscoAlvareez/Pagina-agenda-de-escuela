import React, { useState, useEffect } from "react";
import "./AdminPageEq.css";

const AdminPageEq = () => {
  const [equipments, setEquipments] = useState([]);
  const [activities, setActivities] = useState([]);

  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [stock, setStock] = useState("");
  const [activityId, setActivityId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Función para obtener actividades
  const fetchActivities = async () => {
    try {
      const response = await fetch("http://localhost:5000/actividades");
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error("Error al obtener actividades:", error);
    }
  };

  // Función para obtener equipamientos
  const fetchEquipments = async () => {
    try {
      const response = await fetch("http://localhost:5000/equipamiento");
      const data = await response.json();
      setEquipments(data);
    } catch (error) {
      console.error("Error al obtener equipamientos:", error);
    }
  };

  // Función para agregar un nuevo equipamiento
  const handleAddEquipment = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!description || !cost || !stock || !activityId) {
      setError("Todos los campos son obligatorios.");
      setSuccess("");
      return;
    }

    if (isNaN(cost) || cost <= 0) {
      setError("El costo debe ser un número positivo.");
      setSuccess("");
      return;
    }

    if (isNaN(stock) || stock < 0) {
      setError("El stock debe ser un número mayor o igual a cero.");
      setSuccess("");
      return;
    }

    const newEquipment = {
      descripcion: description,
      costo: parseFloat(cost),
      stock: parseInt(stock),
      id_actividad: parseInt(activityId),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/agregar_equipamiento",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEquipment),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message);
        setError("");

        // Recargar los equipamientos después de agregar uno nuevo
        fetchEquipments();

        // Limpiar campos
        setDescription("");
        setCost("");
        setStock("");
        setActivityId("");
      } else {
        const errorResult = await response.json();
        setError(errorResult.error || "Error al agregar el equipamiento.");
        setSuccess("");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
      setSuccess("");
      console.error("Error al agregar equipamiento:", error);
    }
  };

  // Función para eliminar un equipamiento
  const deleteEquipment = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/equipamientos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setSuccess("Equipamiento eliminado exitosamente.");
        setError("");
        setEquipments((prevEquipments) =>
          prevEquipments.filter((equipment) => equipment.id !== id)
        );
      } else {
        const errorResult = await response.json();
        setError(errorResult.error || "Error al eliminar el equipamiento.");
        setSuccess("");
      }
    } catch (error) {
      setError("Error al conectar con el servidor.");
      setSuccess("");
      console.error("Error al eliminar equipamiento:", error);
    }
  };

  // Cargar actividades y equipamientos al montar el componente
  useEffect(() => {
    fetchActivities();
    fetchEquipments();
  }, []);

  return (
    <div className="admin-container">
      <h1>Administración de Equipamientos</h1>
      <form onSubmit={handleAddEquipment}>
        <h2>Agregar Equipamiento</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        {/* Descripción */}
        <div>
          <label>Descripción:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Costo */}
        <div>
          <label>Costo:</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>

        {/* Actividad */}
        <div>
          <label>Actividad:</label>
          <select
            value={activityId}
            onChange={(e) => setActivityId(e.target.value)}
            required
          >
            <option value="">Seleccione una actividad</option>
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.descripcion}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Guardar Equipamiento</button>
      </form>

      <h2>Equipamientos Existentes</h2>
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Costo</th>
            <th>Stock</th>
            <th>Actividad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {equipments.map((equipment, index) => {
            const activity = activities.find(
              (a) => a.id === equipment.id_actividad
            );

            return (
              <tr key={index}>
                <td>{equipment.descripcion}</td>
                <td>${equipment.costo.toFixed(2)}</td>
                <td>{equipment.stock}</td>
                <td>{activity ? activity.descripcion : "N/A"}</td>
                <td>
                  <button
                    onClick={() => deleteEquipment(equipment.id)}
                    style={{ color: "red", cursor: "pointer" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPageEq;
