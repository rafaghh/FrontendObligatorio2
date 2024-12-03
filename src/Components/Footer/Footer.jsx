import React from "react";
import "./Footer.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h3>Enlaces útiles</h3>
          <ul>
            <li>
              <a href="/juegos">Juegos</a>
            </li>
            <li>
              <a href="/contacto">Contacto</a>
            </li>
            <li>
              <a href="/terminos">Términos y Condiciones</a>
            </li>
            <li>
              <a href="/privacidad">Política de Privacidad</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contacto</h3>
          <ul>
            <li>Email: soporte@cazadoresdejuegos.com</li>
            <li>Teléfono: +598 1234 5678</li>
            <li>Dirección: Av. Uruguay 1530, Montevideo, Uruguay</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Conéctate con nosotros</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook"></i>
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube"></i>
              <span className="sr-only">YouTube</span>
            </a>
          </div>
        </div>
      </div>

      <div className="text-footer">
        © 2024 Cazadores de juegos. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
