import React from "react";
import "./Juego.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useCart } from "../../../Hooks/useCart";

function Juego({ id, imageUrl, name, description, precio, toggleCart }) {
  const { addToCart } = useCart();

  const handleBuyClick = () => {
    const game = {
      id,
      nombre: name,
      descripcion: description,
      precio,
      image: imageUrl,
      quantity: 1,
    };

    addToCart(game, () => {
      toggleCart(); 
    });
  };

  return (
    <div className="lugar-container">
      <Card className="card" style={{ backgroundImage: `url(${imageUrl})` }}>
        <Card.Body className="card-body-container">
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>${precio}</Card.Text>
          <div className="button-group">
            <Button
              variant="outline-light"
              className="detalles"
              onClick={handleBuyClick}
            >
              Comprar
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Juego;
