import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Navbar/Navbar";
import Juegos from "./Components/Juegos/Juegos";
import DetallesJuegos from "./Components/DetallesJuegos/DetallesJuegos";
import Login from "./Components/Login/Login";
import AdminLogin from "./Components/AdminLogin/AdminLogin";
import Registro from "./Components/Registro/Registro";
import Footer from "./Components/Footer/Footer";
import Perfil from "./Components/Perfil/Perfil";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import AgregarJuego from "./Components/AdminDashboard/AgregarJuego/AgregarJuego";
import EditarJuego from "./Components/AdminDashboard/EditarJuego/EditarJuego";
import CarritoBarra from "./Components/Carrito/CarritoBarra";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearch = (searchValue) => setSearchTerm(searchValue);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const userId = sessionStorage.getItem("id");
  const isAdmin = sessionStorage.getItem("adminId");

  return (
    <div className="app-container">
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src="/video.mp4" type="video/mp4" />
          Tu navegador no soporta el video de fondo.
        </video>
        <div className="overlay"></div>
      </div>

      <BrowserRouter>
        <Navbar onSearch={handleSearch} onCartClick={toggleCart} />
        <CarritoBarra isOpen={isCartOpen} toggleCart={toggleCart} />{" "}
        {/* Movido aquí */}
        <Routes>
          <Route
            path="/"
            element={<Juegos searchTerm={searchTerm} toggleCart={toggleCart} />}
          />
          <Route path="/juego/:id" element={<DetallesJuegos />} />
          {!userId && !isAdmin && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/registro" element={<Registro />} />
            </>
          )}
          {isAdmin && (
            <>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/agregar-juego" element={<AgregarJuego />} />
              <Route path="/editar-juego/:id" element={<EditarJuego />} />
            </>
          )}
          {userId && !isAdmin && (
            <>
              <Route path="/perfil/:userId" element={<Perfil />} />
            </>
          )}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
