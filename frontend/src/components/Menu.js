import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/register.css';

function Menu() {
  const userRole = localStorage.getItem('userRole');
  const location = useLocation();

  // Ocultar menú si está logueado o en rutas especiales
  

  return (
    <nav className="navbar">
  <Link className="menu-link" to="/">Inicio</Link>
  <Link className="menu-link" to="/acerca">Acerca de nosotros</Link>
  <Link className="menu-link" to="/contacto">Contáctanos</Link>
  <Link className="menu-link" to="/login">Iniciar sesión</Link>
</nav>

  );
}

export default Menu;
