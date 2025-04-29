import React from 'react';
import { Link } from 'react-router-dom'; // Importamos Link desde react-router-dom
import '../style/register.css';  // Asegúrate de tener este CSS

function LoginCliente() {
  return (
    <div>
      {/* Menú horizontal */}
      <nav className="menu-cliente">
        <div className="contenido-cliente">
          <div className="logo">
            <h2>STAY FIT</h2>
          </div>
          <ul className="menu-links">
            <li><Link to="/productos">Productos</Link></li> {/* Ruta a productos */}
            <li><Link to="/comprar">Mis Compras</Link></li> {/* Ruta a mis compras */}
            <li><Link to="/mi-cuenta">Mi Cuenta</Link></li> {/* Ruta a mi cuenta */}
          </ul>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="contenido-principal">
        <h1>Bienvenido Cliente</h1>
        <p>Explora nuestros batidos saludables, revisa tus pedidos y actualiza tu cuenta.</p>
      </div>
    </div>
  );
}

export default LoginCliente;
