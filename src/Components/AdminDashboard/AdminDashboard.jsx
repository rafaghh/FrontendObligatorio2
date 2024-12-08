import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TabVideojuegos from "./TabVideojuegos";
import TabClientes from "./TabClientes";
import TabVentas from "./TabVentas";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [tab, setTab] = useState("videojuegos");
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Panel de Administración</h1>
      <div className="tabs">
        <button onClick={() => setTab("videojuegos")}>Videojuegos</button>
        <button onClick={() => setTab("clientes")}>Clientes</button>
        <button onClick={() => setTab("ventas")}>Ventas</button>
      </div>
      {tab === "videojuegos" && <TabVideojuegos navigate={navigate} />}
      {tab === "clientes" && <TabClientes navigate={navigate} />}
      {tab === "ventas" && <TabVentas />}
    </div>
  );
}

export default AdminDashboard;
