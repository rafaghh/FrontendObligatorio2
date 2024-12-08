import React, { useState, useEffect } from "react";

function TabClientes({ navigate }) {
  const [clientes, setClientes] = useState([]);
  const [filtroUsuario, setFiltroUsuario] = useState("Todos");

  useEffect(() => {

    const fetchClientes = async () => {
      try {
        let url = "http://localhost:5001/usuarios/all"; 
        if (filtroUsuario === "Premium") {
          url = "http://localhost:5001/usuarios/allPremium";
        } else if (filtroUsuario === "Común") {
          url = "http://localhost:5001/usuarios/allComun";
        }

        const response = await fetch(url);
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Error al cargar los clientes:", error);
        setClientes([]); 
      }
    };

    fetchClientes();
  }, [filtroUsuario]); 

  const eliminarCliente = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este cliente?"))
      return;

    try {
      await fetch(`http://localhost:5001/clientes/delete/${id}`, {
        method: "DELETE",
      });

      setClientes(clientes.filter((cliente) => cliente.id !== id));
      alert("Cliente eliminado con éxito.");
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      alert("No se pudo eliminar el cliente.");
    }
  };

  return (
    <div>
      <select
        onChange={(e) => setFiltroUsuario(e.target.value)}
        value={filtroUsuario}
      >
        <option value="Todos">Todos</option>
        <option value="Premium">Premium</option>
        <option value="Común">Común</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>
                {filtroUsuario === "Todos" ? cliente.tipo : filtroUsuario}
              </td>
              <td>
                <button
                  onClick={() => navigate(`/editar-usuario/${cliente.id}`)}
                >
                  Editar
                </button>
                <button onClick={() => eliminarCliente(cliente.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabClientes;
