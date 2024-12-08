import React, { useState, useEffect } from "react";

function TabVentas() {
  const [ventas, setVentas] = useState([]);
  const [comprasUsuario, setComprasUsuario] = useState([]);
  const [idUsuario, setIdUsuario] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await fetch("http://localhost:5001/ventas/all");
        if (!response.ok) throw new Error("Error al cargar las ventas");
        const data = await response.json();
        setVentas(Array.isArray(data) ? data : []);
        setError("");
      } catch (error) {
        console.error("Error al cargar las ventas:", error);
        setVentas([]);
        setError("No se pudieron cargar las ventas.");
      }
    };

    fetchVentas();
  }, []);

  const buscarComprasPorUsuario = async () => {
    if (!idUsuario) {
      setError("Por favor, ingresa un ID de usuario válido.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5001/usuarios/${idUsuario}/compras`
      );
      if (!response.ok)
        throw new Error("No se encontraron compras para este usuario.");
      const data = await response.json();
      setComprasUsuario(Array.isArray(data) ? data : []);
      setError("");
    } catch (error) {
      console.error("Error al buscar compras por usuario:", error);
      setError("No se encontraron compras para este usuario.");
      setComprasUsuario([]);
    } finally {
      setIsLoading(false);
    }
  };

  const buscarComprasPorFechas = async () => {
    if (!fechaInicio || !fechaFin) {
      setError("Por favor, selecciona ambas fechas.");
      return;
    }

    setIsLoading(true);
    setVentas([]); 
    try {
      const response = await fetch(
        `http://localhost:5001/ventas/fechas?inicio=${fechaInicio}&fin=${fechaFin}`
      );
      if (!response.ok) throw new Error("Error al buscar compras por fechas");
      const data = await response.json();
      setVentas(Array.isArray(data) ? data : []);
      setError("");
    } catch (error) {
      console.error("Error al buscar compras por fechas:", error);
      setError(
        "No se encontraron ventas para el rango de fechas seleccionado."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Ventas</h2>

      <div>
        <h3>Buscar Compras por Usuario</h3>
        <input
          type="text"
          placeholder="ID del Usuario"
          value={idUsuario}
          onChange={(e) => setIdUsuario(e.target.value)}
        />
        <button onClick={buscarComprasPorUsuario}>Buscar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {comprasUsuario.length > 0 && (
        <div>
          <h3>Compras del Usuario {idUsuario}</h3>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Videojuego</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {comprasUsuario.map((compra) =>
                compra.listaDetalles.map((detalle) => (
                  <tr key={detalle.idDetalle}>
                    <td>
                      {new Date(compra.fechaDeVenta).toLocaleDateString()}
                    </td>
                    <td>
                      {detalle.videojuegoEntity?.nombreVideojuego || "Desconocido"}
                    </td>
                    <td>{detalle.cantidad}</td>
                    <td>${detalle.precioUnitario.toFixed(2)}</td>
                    <td>
                      ${(detalle.cantidad * detalle.precioUnitario).toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <div>
        <h3>Buscar Ventas por Fechas</h3>
        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input
          type="date"
          id="fechaInicio"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
        <label htmlFor="fechaFin">Fecha de Fin:</label>
        <input
          type="date"
          id="fechaFin"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
        />
        <button onClick={buscarComprasPorFechas}>Buscar por Fechas</button>
      </div>

      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <h3>Todas las Ventas</h3>
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Videojuego</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ventas.length > 0 ? (
                ventas.map((venta) =>
                  venta.listaDetalles.map((detalle) => (
                    <tr key={detalle.idDetalle}>
                      <td>{new Date(venta.fechaDeVenta).toLocaleDateString()}</td>
                      <td>
                        {detalle.videojuegoEntity?.nombreVideojuego || "Desconocido"}
                      </td>
                      <td>{detalle.cantidad}</td>
                      <td>${detalle.precioUnitario.toFixed(2)}</td>
                      <td>
                        ${(detalle.cantidad * detalle.precioUnitario).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="5">No hay ventas disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TabVentas;
