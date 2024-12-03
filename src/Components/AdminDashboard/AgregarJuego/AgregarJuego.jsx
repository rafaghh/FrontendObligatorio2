import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AgregarJuego.css";

function AgregarJuego() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [stock, setStock] = useState("");

  const adminId = sessionStorage.getItem("adminId");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

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
          idAdministrador: adminId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el juego");
      }

      alert("Juego agregado con éxito");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error al agregar el juego:", error);
      alert("No se pudo agregar el juego. Por favor verifica los datos.");
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
        <button type="submit">Agregar Juego</button>
      </form>
    </div>
  );
}

export default AgregarJuego;
