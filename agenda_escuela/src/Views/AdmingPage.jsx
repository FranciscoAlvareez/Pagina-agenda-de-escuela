import React, { useState, useEffect } from "react";
import ClassForm from "../Components/Forms/ClassForm";
import "./AdminPage.css";

const AdminPage = () => {
  const [professors, setProfessors] = useState([]);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();

      // Filtrar por roles
      const profs = data.filter((user) => user.role === "profesor");
      const studs = data.filter((user) => user.role === "alumno");

      setProfessors(profs);
      setStudents(studs);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddClass = (newClass) => {
    setClasses((prevClasses) => [...prevClasses, newClass]);
  };

  return (
    <div>
      <h1>Administración</h1>
      <ClassForm
        instructors={professors}
        students={students}
        onSubmit={handleAddClass}
      />
      <h2>Clases Existentes</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Instructor</th>
            <th>Turno</th>
            <th>Alumnos</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classItem, index) => (
            <tr key={index}>
              <td>{classItem.className}</td>
              <td>{classItem.instructor}</td>
              <td>{classItem.turn}</td>
              <td>{classItem.students.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
