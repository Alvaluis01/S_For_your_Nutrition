import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function PaginaAdmin() {
  
  
  
  return (
    <div>
      
      <nav className="menu-cliente">
        <div className="contenido-cliente">
          <div className="logo">
            <h2>S´ FOR YOUR NUTRITION</h2>
          </div>
          <ul className="menu-links">
            <li><Link to="/pedidos">Pedidos</Link></li>
            <li><Link to="/notificaciones">Notificaciones</Link></li>
            <li><Link to="/inventario">Inventario</Link></li>
            <li><Link to="/micuentaadmin">Mi Cuenta</Link></li>
          </ul>
        </div>
      </nav>
      <h1>Bienvenido nuevamente Admin🥤</h1>
      
    </div>
  );
}

export default PaginaAdmin;