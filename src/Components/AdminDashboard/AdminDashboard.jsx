import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [juegos, setJuegos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const response = await fetch("http://localhost:5001/videojuegos/all");
        const data = await response.json();
        setJuegos(data);
      } catch (error) {
        console.error("Error al cargar los juegos:", error);
      }
    };

    fetchJuegos();
  }, []);

  const eliminarJuego = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este juego?"
    );
    if (!confirmar) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5001/videojuegos/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Error al eliminar el juego: " + errorText);
      }

      setJuegos(juegos.filter((juego) => juego.idVideojuego !== id));

      alert("Juego eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el juego:", error);
      alert("No se pudo eliminar el juego. Por favor, inténtalo de nuevo.");
    }
  };

  const editarJuego = (id) => {
    navigate(`/editar-juego/${id}`); 
  };

  const agregarJuego = () => {
    navigate("/agregar-juego"); 
  };

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      <button onClick={agregarJuego}>Agregar Juego</button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map((juego) => (
            <tr key={juego.idVideojuego}>
              <td>{juego.nombreVideojuego}</td>
              <td>{juego.descripcion}</td>
              <td>${juego.precio}</td>
              <td>
                <button onClick={() => editarJuego(juego.idVideojuego)}>
                  Editar
                </button>
                <button onClick={() => eliminarJuego(juego.idVideojuego)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
