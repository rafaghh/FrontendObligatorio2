import React, { useState, useEffect } from "react";
import Juego from "./Components/Juego";
import "./Juegos.css";
import Cargando from "../Cargando/Cargando";

function Juegos({ toggleCart }) {
  const [data, setData] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");

  useEffect(() => {
    const fetchVideojuegosYCategorias = async () => {
      try {
        const categoriasResponse = await fetch(
          "http://localhost:5001/categorias/all"
        );
        const categorias = await categoriasResponse.json();

        console.log("Categorías cargadas:", categorias);
        setCategorias([
          { idCategoria: 0, nombre: "Todos los géneros" },
          ...categorias,
        ]);

        const videojuegosResponse = await fetch(
          "http://localhost:5001/videojuegos/all"
        );
        const videojuegos = await videojuegosResponse.json();

        console.log("Videojuegos cargados:", videojuegos);

        const videojuegosConCategorias = videojuegos.map((juego) => {
          const categoria = categorias.find(
            (cat) => cat.idCategoria === juego.idCategoria
          );
          return { ...juego, categoria: categoria?.nombre || "Sin Categoría" };
        });

        console.log("Videojuegos con categorías:", videojuegosConCategorias);

        setData(videojuegosConCategorias);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchVideojuegosYCategorias();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setSelectedCategoria(event.target.value);
  };

  const filteredVideojuegos = data.filter((juego) => {
    const matchesSearch = juego.nombreVideojuego
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategoria =
      selectedCategoria === "Todas" || juego.categoria === selectedCategoria;
    return matchesSearch && matchesCategoria;
  });

  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Buscar Juego"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="categoria-dropdown"
          value={selectedCategoria}
          onChange={handleCategoriaChange}
        >
          {categorias.map((categoria) => (
            <option key={categoria.idCategoria} value={categoria.nombre}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <Cargando />
      ) : data.length > 0 ? (
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
              categoria={juego.categoria}
            />
          ))}
        </div>
      ) : (
        <div>No se encontraron videojuegos.</div>
      )}
    </div>
  );
}

export default Juegos;
