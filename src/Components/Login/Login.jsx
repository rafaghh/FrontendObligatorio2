import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5001/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (result.status === 200) {
        const data = result.data;
        sessionStorage.setItem("id", data.user.id);
        window.location.assign("/");
      } else {
        alert("Usuario no encontrado");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Entrar"}
          </button>
        </form>
        <div className="login-links">
          <Link to="/registro">No tengo una cuenta</Link>
          {" | "}
          <Link to="/admin-login">Soy administrador</Link>
        </div>
      </div>
    </div>
  );
}
