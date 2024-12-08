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

    addToCart(game);

    setTimeout(() => {
      navigate("/carrito");
    }, 100); 
  };

  const handleCardClick = () => {
    navigate(`/juego/${id}`);
  };

  const handleSeeMoreClick = (event) => {
    event.stopPropagation();
    navigate(`/juego/${id}`);
  };

  const renderDescription = () => {
    if (description.length > 20) {
      return (
        <>
          {`${description.slice(0, 20)}...`}
          <span
            className="ver-mas"
            onClick={handleSeeMoreClick}
            style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
          >
            Ver más
          </span>
        </>
      );
    }
    return description;
  };

  return (
    <div className="lugar-container" onClick={handleCardClick}>
      <Card className="card" style={{ backgroundImage: `url(${imageUrl})` }}>
        {categoria && <div className="categoria-label">{categoria}</div>}

        <Card.Body className="card-body-container">
          <Card.Title>{name}</Card.Title>
          <Card.Text>{renderDescription()}</Card.Text>
          <Card.Text class="precio">${precio}</Card.Text>
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
