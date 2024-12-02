import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Perfil.css";
import Cargando from "../Cargando/Cargando";
import ModoPremiumForm from "./ModoPremiumForm";

function Perfil() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const authenticatedUserId = sessionStorage.getItem("id");
  const [userData, setUserData] = useState(null);
  const [compras, setCompras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("informacion"); // Estado para la sección activa

  useEffect(() => {
    if (authenticatedUserId !== userId) {
      alert("No tienes permiso para acceder a este perfil.");
      navigate("/");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/usuarios/${userId}`);
        if (!response.ok) throw new Error("Error al obtener los datos del usuario");
        const result = await response.json();
        setUserData(result);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCompras = async () => {
      try {
        const response = await fetch(`http://localhost:5001/usuarios/${userId}/compras`);
        if (!response.ok) throw new Error("Error al obtener las compras");
        const result = await response.json();
        setCompras(result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserData();
    fetchCompras();
  }, [userId, authenticatedUserId, navigate]);

  if (isLoading) return <Cargando />;
  if (!userData) return <div className="perfil-error">No se encontraron datos del usuario</div>;

  return (
    <div className="perfil-container">
      <div className="perfil-sidebar">
        <h2>Menú</h2>
        <ul>
          <li onClick={() => setActiveSection("informacion")} className={activeSection === "informacion" ? "active" : ""}>
            Información
          </li>
          <li onClick={() => setActiveSection("editar")} className={activeSection === "editar" ? "active" : ""}>
            Editar Perfil
          </li>
          <li onClick={() => setActiveSection("compras")} className={activeSection === "compras" ? "active" : ""}>
            Historial de Compras
          </li>
          <li onClick={() => setActiveSection("premium")} className={activeSection === "premium" ? "active" : ""}>
            Modo Premium
          </li>
        </ul>
      </div>
      <div className="perfil-content">
        {activeSection === "informacion" && (
          <section>
            <h2>Información del Usuario</h2>
            <p><strong>Nombre:</strong> {userData.nombre}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Miembro desde:</strong> {new Date(userData.fechaRegistro).toLocaleDateString()}</p>
            <p><strong>Tipo de usuario:</strong> {userData.tipoUsuario}</p>
          </section>
        )}
        {activeSection === "editar" && (
          <section>
            <h2>Editar Perfil</h2>
            <EditarUsuarioForm userId={userId} userData={userData} />
          </section>
        )}
        {activeSection === "compras" && (
          <section>
            <h2>Historial de Compras</h2>
            {compras.length === 0 ? (
              <p>No se encontraron compras</p>
            ) : (
              <ul className="compras-lista">
                {compras.map((compra) => (
                  <li key={compra.idVenta}>
                    <p><strong>Fecha:</strong> {new Date(compra.fechaDeVenta).toLocaleDateString()}</p>
                    <p><strong>Monto Total:</strong> ${compra.montoTotal.toFixed(2)}</p>
                    {compra.listaDetalles?.length > 0 && (
                      <ul>
                        {compra.listaDetalles.map((detalle) => (
                          <li key={detalle.idDetalle}>
                            <strong>Producto:</strong> {detalle.videojuegoEntity.nombreVideojuego} - 
                            <strong> Cantidad:</strong> {detalle.cantidad} - 
                            <strong> Precio Unitario:</strong> ${detalle.precioUnitario.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
        {activeSection === "premium" && (
          <section>
            <h2>Modo Premium</h2>
            <ModoPremiumForm userId={userId} isPremium={userData.tipoUsuario === "Premium"} />
          </section>
        )}
      </div>
    </div>
  );
}

function EditarUsuarioForm({ userId, userData }) {
  const [formData, setFormData] = useState({
    nombre: userData.nombre,
    email: userData.email,
    contrasenia: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5001/usuarios/edit/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Error al actualizar el perfil");
      alert("Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="editar-form" onSubmit={handleSubmit}>
      <label>Nombre:</label>
      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      <label>Contraseña:</label>
      <input type="password" name="contrasenia" value={formData.contrasenia} onChange={handleChange} required />
      <button type="submit">Guardar Cambios</button>
    </form>
  );
}

export default Perfil;
