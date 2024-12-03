import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./Navbar.css";

function NavbarWeb({ onSearch, onCartClick, cartItemCount }) {
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  function Salir() {
    sessionStorage.clear();
    window.location.assign("/");
  }

  const userId = sessionStorage.getItem("id");
  const adminId = sessionStorage.getItem("adminId"); 

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
            <button className="cart-button" onClick={onCartClick}>
              🛒 Carrito <span className="cart-count">{cartItemCount}</span>
            </button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarWeb;
