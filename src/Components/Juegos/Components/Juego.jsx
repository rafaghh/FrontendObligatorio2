import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Juego.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useCart } from "../../../Hooks/useCart";

function Juego({
  id,
  imageUrl,
  name,
  description,
  precio,
  toggleCart,
  categoria,
}) {
  const { addToCart } = useCart();
  const navigate = useNavigate(); 

  const handleBuyClick = (event) => {
    event.stopPropagation(); 
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

  const handleCardClick = () => {
    navigate(`/juego/${id}`); 
  };

  return (
    <div className="lugar-container" onClick={handleCardClick}>
      <Card className="card" style={{ backgroundImage: `url(${imageUrl})` }}>
        {categoria && <div className="categoria-label">{categoria}</div>}

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