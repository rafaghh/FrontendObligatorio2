import React, { useEffect } from "react";
import { useCart } from "../../Hooks/useCart";
import { useUser } from "../../Hooks/useUser";
import { useNavigate } from "react-router-dom";
import "./CarritoBarra.css";

const CarritoBarra = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const user = useUser();
  const navigate = useNavigate();

  const isPremium = user?.tipoUsuario === "Premium";

  useEffect(() => {
    console.log("Carrito actualizado:", cart);
  }, [cart]);

  const total = cart.reduce((acc, item) => {
    const price = isPremium ? item.precio * 0.8 : item.precio;
    return acc + price * item.quantity;
  }, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("No tienes productos en el carrito para realizar la compra.");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:5001/usuarios/${user?.id}`
      );
      if (!response.ok) {
        throw new Error("Error al validar el usuario.");
      }
  
      const userData = await response.json();
  
      if (!userData.tarjeta) {
        alert(
          "No tienes una tarjeta asociada. Por favor, asocia una tarjeta válida en tu perfil para continuar."
        );
        navigate(`/perfil/${user?.id}`);
        return;
      }
  
      const ventaResponse = await fetch("http://localhost:5001/ventas/add", {
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
  
      if (!ventaResponse.ok) {
        const contentType = ventaResponse.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await ventaResponse.json();
          throw new Error(errorData.message || "Error al procesar la compra");
        } else {
          const errorText = await ventaResponse.text();
          throw new Error(errorText || "Error al procesar la compra");
        }
      }
  
      alert("Compra realizada con éxito.");
      clearCart();
      navigate("/");
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
      alert(`Hubo un problema al realizar la compra: ${error.message}`);
    }
  };
  

  return (
    <div className="carrito-pagina">
      <h2 className="carrito-header">Tu Carrito</h2>
      {cart.length === 0 ? (
        <p className="carrito-empty">El carrito está vacío.</p>
      ) : (
        <>
          <ul className="carrito-list">
            {cart.map((item) => {
              const discountedPrice = isPremium
                ? item.precio * 0.8
                : item.precio;
              return (
                <li key={item.id} className="carrito-item">
                  <h5 className="carrito-item-name">{item.nombre}</h5>
                  <p>
                    Precio:{" "}
                    {isPremium && (
                      <span className="carrito-item-tachado">
                        ${item.precio.toFixed(2)}
                      </span>
                    )}{" "}
                    <span className="carrito-item-descuento">
                      ${discountedPrice.toFixed(2)}
                    </span>
                  </p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>
                    Subtotal: ${(discountedPrice * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="carrito-item-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Eliminar
                  </button>
                </li>
              );
            })}
          </ul>
          <h3 className="carrito-total">Total: ${total.toFixed(2)}</h3>
        </>
      )}
      <div className="carrito-actions">
        {cart.length > 0 && (
          <>
            <button className="carrito-clear" onClick={clearCart}>
              Vaciar Carrito
            </button>
            <button className="carrito-checkout" onClick={handleCheckout}>
              Finalizar Compra
            </button>
          </>
        )}
        <button className="carrito-back" onClick={() => navigate("/")}>
          Volver a la Tienda
        </button>
      </div>
    </div>
  );
};

export default CarritoBarra;
