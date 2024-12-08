import React, { useState, useEffect } from "react";

function TabVideojuegos({ navigate }) {
  const [juegos, setJuegos] = useState([]);
  const [filtroStock, setFiltroStock] = useState("");

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

  const filtrarJuegosPorStock = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/videojuegos/stock-menor/${filtroStock}`
      );
      const data = await response.json();
      setJuegos(data);
    } catch (error) {
      console.error("Error al filtrar los juegos:", error);
    }
  };

  const eliminarJuego = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este juego?"))
      return;

    try {
      await fetch(`http://localhost:5001/videojuegos/delete/${id}`, {
        method: "DELETE",
      });

      setJuegos(juegos.filter((juego) => juego.idVideojuego !== id));
      alert("Juego eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el juego:", error);
      alert("No se pudo eliminar el juego.");
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/agregar-juego")}>Agregar Juego</button>
      <input
        type="number"
        placeholder="Stock menor a..."
        value={filtroStock}
        onChange={(e) => setFiltroStock(e.target.value)}
      />
      <button onClick={filtrarJuegosPorStock}>Filtrar</button>
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
                <button
                  onClick={() =>
                    navigate(`/editar-juego/${juego.idVideojuego}`)
                  }
                >
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

export default TabVideojuegos;
