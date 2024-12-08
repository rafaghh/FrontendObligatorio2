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
  const [categorias, setCategorias] = useState([]);
  const [idCategoria, setIdCategoria] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const responseJuego = await fetch(
          `http://localhost:5001/videojuegos/${id}`
        );
        const juego = await responseJuego.json();
        setNombre(juego.nombreVideojuego);
        setDescripcion(juego.descripcion);
        setPrecio(juego.precio);
        setImagen(juego.imagen);
        setStock(juego.stock);
        setIdCategoria(juego.categoria?.idCategoria || "");

        const responseCategorias = await fetch(
          "http://localhost:5001/categorias/all"
        );
        const categorias = await responseCategorias.json();
        setCategorias(categorias);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        alert("No se pudieron cargar los datos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDatos();
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
            categoria: { idCategoria: Number(idCategoria) }, 
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Error al actualizar el juego");
      }

      alert("Juego actualizado con éxito");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error al actualizar el juego:", error);
      alert("No se pudo actualizar el juego. Verifica los datos.");
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
          required
        />
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          id="precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <label htmlFor="imagen">URL de la Imagen</label>
        <input
          type="text"
          id="imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          required
        />
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <label htmlFor="categoria">Categoría</label>
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
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarJuego;
