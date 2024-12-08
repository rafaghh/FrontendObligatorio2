import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

export default function AdminSignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5001/administradores/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, contrasenia: password }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        alert(errorMessage || "Error al iniciar sesión");
        setIsLoading(false);
        return;
      }

      const result = await response.json();
      if (result.status === 200) {
        sessionStorage.setItem("adminId", result.data.id);
        window.location.reload();
      } else {
        alert(result.message || "Administrador no encontrado");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error en la conexión con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2 className="admin-login-title">Iniciar sesión como Administrador</h2>
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="Ingrese su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
