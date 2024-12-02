import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Registro.css";

function AgregarUsuario() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    contrasenia: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5001/usuarios/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }
      alert("Usuario registrado con éxito");
      navigate("/login"); // Redirige al login después del registro
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert("Error al registrar el usuario. Por favor, verifica los datos.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2>Crear Cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              placeholder="Ingresa tu nombre"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contrasenia">Contraseña</label>
            <input
              type="password"
              id="contrasenia"
              name="contrasenia"
              value={formData.contrasenia}
              onChange={handleInputChange}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "REGISTRARME"}
          </button>
        </form>
        <div className="registro-links">
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AgregarUsuario;
