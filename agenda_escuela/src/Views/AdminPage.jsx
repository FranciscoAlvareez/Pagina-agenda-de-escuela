import React, { useEffect, useState } from "react";

const AdminPage = () => {
    const [rol, setRol] = useState(null);
  
    useEffect(() => {
      const userRol = localStorage.getItem("rol");
      setRol(userRol);
    }, []);
  
    const data = [
      { id: 1, name: "Clase 1", instructor: "Juan" },
      { id: 2, name: "Clase 2", instructor: "María" },
    ];
  
    return (
      <div>
        <h1>Administración</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Instructor</th>
              {rol === "admin" && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.instructor}</td>
                {rol === "admin" && (
                  <td>
                    <button>Editar</button>
                    <button>Eliminar</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  