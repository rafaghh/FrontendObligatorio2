import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbar.css";

function NavbarWeb({ onSearch, cartItemCount }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const userId = sessionStorage.getItem("id");
  const adminId = sessionStorage.getItem("adminId");

  useEffect(() => {
    const fetchUserName = async () => {
      if (userId) {
        try {
          const response = await fetch(
            `http://localhost:5001/usuarios/${userId}`
          );
          if (!response.ok) {
            throw new Error("No se pudo obtener la información del usuario");
          }
          const data = await response.json();
          setUserName(data.nombre || "");
        } catch (error) {
          console.error("Error al obtener el nombre del usuario:", error);
        }
      }
    };

    fetchUserName();
  }, [userId]);

  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  const handleCartClick = () => {
    navigate("/carrito");
  };

  function Salir() {
    sessionStorage.clear();
    window.location.assign("/");
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src="/logo.png" alt="logo sitio" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Inicio</Nav.Link>
            {!userId && !adminId && <Nav.Link href="/login">Entrar</Nav.Link>}

            {(userId || adminId) && (
              <NavDropdown title="Perfil" id="navbarScrollingDropdown">
                {userId && (
                  <NavDropdown.Item href={`/perfil/${userId}`}>
                    Ver mi perfil
                  </NavDropdown.Item>
                )}
                {adminId && (
                  <NavDropdown.Item href="/admin-dashboard">
                    Panel de Administración
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={Salir}>Salir</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          <div className="cart-container">
            {userName && (
              <span className="welcome-message">
                👋 Hola, {userName}! Qué gusto verte por aquí.
              </span>
            )}
            <button className="cart-button" onClick={handleCartClick}>
              🛒 Carrito <span className="cart-count">{cartItemCount}</span>
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarWeb;
