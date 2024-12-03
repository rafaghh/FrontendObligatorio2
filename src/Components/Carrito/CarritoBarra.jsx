import React, { useEffect } from "react";
import { useCart } from "../../Hooks/useCart";
import { useUser } from "../../Hooks/useUser";
import { useNavigate } from "react-router-dom";
import "./CarritoBarra.css";

const CarritoBarra = ({ isOpen, toggleCart }) => {
  const { cart, removeFromCart, clearCart, refreshCart } = useCart();
  const user = useUser();
  const navigate = useNavigate();

  const isPremium = user?.tipoUsuario === "Premium";
  const hasCard = user?.tarjeta;

  useEffect(() => {
    if (isOpen) {
      refreshCart();
    }
  }, [isOpen, refreshCart]);

  const total = cart.reduce((acc, item) => {
    const price = isPremium ? item.precio * 0.8 : item.precio;
    return acc + price * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    if (!hasCard || hasCard === "Número de tarjeta inválido" || hasCard.trim() === "") {
      alert("Debes asociar una tarjeta válida antes de realizar una compra.");
      navigate(`/perfil/${user?.id}`);
      return;
    }
  
    if (cart.length === 0) {
      alert("No tienes productos en el carrito para realizar la compra.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5001/ventas/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUsuario: user.id,
          listaDetalles: cart.map((item) => ({
            idVideojuego: item.id,
            cantidad: item.quantity,
          })),
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al procesar la compra");
      }
  
      alert("Compra realizada con éxito.");
      clearCart();
      toggleCart();
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      alert(`Hubo un problema al realizar la compra: ${error.message}`);
    }
  };

  return (
    <div className={`carrito-barra ${isOpen ? "carrito-barra-open" : ""}`}>
      <div className="carrito-barra-header">
        <h2>Carrito</h2>
        <button className="carrito-barra-close-button" onClick={toggleCart}>
          &times;
        </button>
      </div>
      <div className="carrito-barra-body">
        {cart.length === 0 ? (
          <p className="carrito-barra-empty">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="carrito-barra-list">
              {cart.map((item) => {
                const discountedPrice = isPremium
                  ? item.precio * 0.8
                  : item.precio;
                return (
                  <li key={item.id} className="carrito-barra-list-item">
                    <h5 className="carrito-barra-item-name">{item.nombre}</h5>
                    <p>
                      Precio:{" "}
                      {isPremium && (
                        <span className="carrito-barra-tachado">
                          ${item.precio.toFixed(2)}
                        </span>
                      )}{" "}
                      <span className="carrito-barra-descuento">
                        ${discountedPrice.toFixed(2)}
                      </span>
                    </p>
                    <p>Cantidad: {item.quantity}</p>
                    <p>
                      Subtotal: ${(discountedPrice * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="carrito-barra-remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                );
              })}
            </ul>
            <h3 className="carrito-barra-total">Total: ${total.toFixed(2)}</h3>
          </>
        )}
      </div>
      {cart.length > 0 && (
        <div className="carrito-barra-footer">
          <button
            className="carrito-barra-footer-button carrito-barra-footer-clear"
            onClick={clearCart}
          >
            Vaciar Carrito
          </button>
          <button
            className="carrito-barra-footer-button carrito-barra-footer-checkout"
            onClick={handleCheckout}
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default CarritoBarra;
