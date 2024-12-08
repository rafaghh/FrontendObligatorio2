import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AgregarJuego.css";

function AgregarJuego() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [stock, setStock] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState("");
  const adminId = sessionStorage.getItem("adminId"); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:5001/categorias/all");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar datos requeridos
    if (!idCategoria || !adminId) {
      alert("Por favor selecciona una categoría y verifica tu sesión.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/videojuegos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombreVideojuego: nombre,
          descripcion,
          precio: Number(precio),
          imagen,
          stock: Number(stock),
          administrador: { idAdministrador: Number(adminId) }, 
          categoria: { idCategoria: Number(idCategoria) }, 
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al agregar el videojuego");
      }

      alert("Juego agregado con éxito");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error al agregar el videojuego:", error);
      alert("No se pudo agregar el videojuego. Verifica los datos.");
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Agregar Juego</h1>
      <form className="form-content" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del juego"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción del juego"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio del juego"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL de la imagen del juego"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Cantidad en stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <select
          value={idCategoria}
          onChange={(e) => setIdCategoria(e.target.value)}
          required
        >
          <option value="">Seleccionar Categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.idCategoria} value={categoria.idCategoria}>
              {categoria.nombre}
            </option>
          ))}
        </select>
        <button type="submit">Agregar Juego</button>
      </form>
    </div>
  );
}

export default AgregarJuego;
