import React from "react";
import "./Juego.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function Juego({ id, imageUrl, name, description, precio }) {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/juego/${id}`); // Asegúrate de usar id aquí
  };

  return (
    <div className="lugar-container">
      <Card className="card" style={{ backgroundImage: `url(${imageUrl})` }}>
        <Card.Body className="card-body-container">
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>${precio}</Card.Text>
          <Button
            variant="outline-light"
            className="detalles"
            onClick={handleDetailsClick}
          >
            Ver Detalles
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Juego;
