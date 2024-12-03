import React, { useState, useEffect } from "react";
import Juego from "./Components/Juego";
import "./Juegos.css";
import Cargando from "../Cargando/Cargando";

function Juegos({ toggleCart }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchVideojuegos = async () => {
      try {
        const response = await fetch("http://localhost:5001/videojuegos/all");
        const videojuegos = await response.json();
        setData(videojuegos);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar los videojuegos:", error);
      }
    };

    fetchVideojuegos();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredVideojuegos = data.filter((juego) =>
    juego.nombreVideojuego.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Buscar Juego"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {isLoading ? (
        <Cargando />
      ) : (
        <div className="lugares-container">
          {filteredVideojuegos.map((juego) => (
            <Juego
              key={juego.idVideojuego}
              id={juego.idVideojuego}
              imageUrl={juego.imagen}
              name={juego.nombreVideojuego}
              description={juego.descripcion}
              precio={juego.precio}
              toggleCart={toggleCart} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Juegos;
