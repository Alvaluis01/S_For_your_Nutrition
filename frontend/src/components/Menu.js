import React from 'react';
import { Link, useLocation } from 'react-router-dom';  // Asegúrate de importar useLocation
import '../style/register.css';  // 👈 importa el CSS

function Menu() {
  const userRole = localStorage.getItem('userRole');  // Obtener el rol del usuario desde localStorage
  const location = useLocation();  // Obtener la ruta actual

  // Si el usuario es admin o cliente, o está en las rutas de admin/cliente, no mostrar el menú
  if (userRole || location.pathname.startsWith('/admin') || location.pathname.startsWith('/cliente')) {
    return null;  // No muestra el menú si hay un rol guardado o si está en las rutas de admin o cliente
  }

  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/acerca">Acerca</Link>
      <Link to="/contacto">Contactanos</Link>
      <Link to="/ubicacion">Ubicación</Link>
      <Link to="/login">Iniciar sesión</Link>
    </nav>
  );
}

export default Menu;
