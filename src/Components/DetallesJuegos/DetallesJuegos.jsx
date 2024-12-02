import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./DetallesJuegos.css";
import Cargando from "../Cargando/Cargando";

function DetallesJuegos() {
  const { id } = useParams();
  const [juego, setJuego] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJuego = async () => {
      try {
        const response = await fetch(`http://localhost:5001/videojuegos/${id}`);
        if (!response.ok) {
          throw new Error("Error al obtener los detalles del juego");
        }
        const data = await response.json();
        setJuego(data);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJuego();
  }, [id]);

  if (isLoading) {
    return <Cargando />;
  }

  if (!juego) {
    return <div className="detalles-error">No se encontraron detalles para este juego.</div>;
  }

  return (
    <div className="detalles-juego-container">
      <div className="detalles-header">
        <h1>{juego.nombreVideojuego}</h1>
        <span className="detalles-precio">${juego.precio}</span>
      </div>
      <div className="detalles-body">
        <img
          src={juego.imagen}
          alt={juego.nombreVideojuego}
          className="juego-imagen"
        />
        <div className="detalles-info">
          <p>
            <strong>Descripción:</strong> {juego.descripcion}
          </p>
          <p>
            <strong>Stock Disponible:</strong> {juego.stock}
          </p>
          <p>
            <strong>Publicado por:</strong> {juego.administrador?.nombre || "Desconocido"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetallesJuegos;