import React from 'react';
import { Link } from 'react-router-dom';
  // Reutilizamos tu estilo
import '../style/products.css';
function LoginCliente() {
  return (
    <div>
      {/* Menú horizontal */}
      

      {/* Contenido principal */}
      <div className="contenido-principal">
        <h1>Bienvenido Cliente</h1>
        <p>¿Qué deseas hacer?</p>

        <div className="opciones-login">
          <Link to="/registrar" className="boton-opcion">Registrarse</Link>
          <Link to="/ingresar" className="boton-opcion">Ingresar</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginCliente;
