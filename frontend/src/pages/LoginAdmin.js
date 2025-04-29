import React from 'react';
import { Link } from 'react-router-dom';  // Importa Link de react-router-dom
import '../style/register.css';  // Asegúrate de tener este CSS

function LoginAdmin() {
  return (
    <div>
      {/* Menú horizontal */}
      <nav className="menu-cliente">
        <div className="contenido-cliente">
          <div className="logo">
            <h2>STAY FIT</h2>
          </div>
          <ul className="menu-links">
            <li><Link to="/productos">Productos</Link></li> {/* Enlace para productos */}
            <li><a href="#">Inventario</a></li>
            <li><a href="#">Mi Cuenta</a></li>
          </ul>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="contenido-principal">
        <h1>Bienvenido Admin</h1>
        <p>Explora nuestros batidos saludables, revisa tus pedidos y actualiza tu cuenta.</p>
      </div>
    </div>
  );
}

export default LoginAdmin;
