import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./EditarUsuario.css";

function EditarUsuario() {
  const { id } = useParams(); 
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:5001/usuarios/${id}`);
        if (!response.ok) throw new Error("Usuario no encontrado");
        const usuario = await response.json();

        setNombre(usuario.nombre);
        setEmail(usuario.email);
        setTipoUsuario(usuario.tipoUsuario);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
        alert("No se pudo cargar el usuario.");
        navigate("/admin-dashboard"); 
      }
    };

    fetchUsuario();
  }, [id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5001/usuarios/edit/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, email }),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar el usuario");

      alert("Usuario actualizado con éxito");
      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alert("No se pudo actualizar el usuario.");
    }
  };

  if (isLoading) return <div>Cargando datos del usuario...</div>;

  return (
    <div className="editar-usuario-container">
      <h1>Editar Usuario</h1>
      <form className="editar-usuario-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="tipoUsuario">Tipo de Usuario:</label>
        <input
          type="text"
          id="tipoUsuario"
          value={tipoUsuario}
          readOnly
          disabled
        />

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarUsuario;
