import React, { useState } from "react";

function Salir() {
  sessionStorage.clear();
  window.location.assign("/");
}

function ModoPremiumForm({ userId, isPremium }) {
  const [tarjeta, setTarjeta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isPremium
        ? `http://localhost:5001/usuarios/convertir-a-comun/${userId}`
        : `http://localhost:5001/usuarios/convertir-a-premium/${userId}`;

      const body = isPremium
        ? null
        : JSON.stringify({
            fechaMembresia: new Date().toISOString().split("T")[0], 
            tarjeta,
          });

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert("Para confirmar los cambios, vuelve a iniciar sesión.");
      Salir();
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      alert(error.message || "Ocurrió un error, por favor intenta de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isPremium && (
        <div>
          <label>Tarjeta de Crédito:</label>
          <input
            type="text"
            name="tarjeta"
            value={tarjeta}
            onChange={(e) => setTarjeta(e.target.value)}
            required
          />
        </div>
      )}
      <button type="submit">
        {isPremium ? "Dejar de ser Premium" : "Guardar y ser Premium"}
      </button>
    </form>
  );
}

export default ModoPremiumForm; 
