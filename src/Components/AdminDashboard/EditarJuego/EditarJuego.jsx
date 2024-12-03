import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditarJuego.css";

function EditarJuego() {
  const { id } = useParams(); 
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [stock, setStock] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJuego = async () => {
      try {
        const response = await fetch(`http://localhost:5001/videojuegos/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del juego");
        }
        const data = await response.json();
        setNombre(data.nombreVideojuego);
        setDescripcion(data.descripcion);
        setPrecio(data.precio);
        setImagen(data.imagen);
      } catch (error) {
        console.error("Error al cargar el juego:", error);
        alert("No se pudo cargar el juego.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJuego();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5001/videojuegos/edit/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombreVideojuego: nombre,
            descripcion,
            precio: Number(precio),
            imagen,
            stock: Number(stock),
          }),
        }
      );
      const result = await response.json();

      console.log("Respuesta del servidor:", result);

      if (!response.ok) {
        throw new Error(result.message || "Error desconocido al actualizar");
      }

      alert("Juego actualizado con éxito");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error al actualizar el juego:", error);
      alert(error.message || "No se pudo actualizar el juego.");
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="editar-juego-container">
      <h1>Editar Juego</h1>
      <form className="editar-juego-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del juego"
          required
        />

        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Descripción del juego"
          required
        />

        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          id="precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          placeholder="Precio del juego"
          required
        />

        <label htmlFor="imagen">URL de la Imagen</label>
        <input
          type="text"
          id="imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          placeholder="URL de la imagen"
          required
        />

        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Cantidad en stock"
          required
        />

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarJuego;
