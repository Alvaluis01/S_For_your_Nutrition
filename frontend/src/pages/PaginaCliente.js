import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function PaginaCliente() {
  

  return (
    <div>
      
      <nav className="menu-cliente">
        <div className="contenido-cliente">
          <div className="logo">
            <h2>S´ FOR YOUR NUTRITION</h2>
            

          </div>
          <ul className="menu-links">
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/comprar">Ordenar</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/mi-cuenta">Mi Cuenta</Link></li>
          </ul>
        </div>
      </nav>
      <h1>Bienvenido nuevamente 🥤</h1>
    </div>
  );
}

export default PaginaCliente;