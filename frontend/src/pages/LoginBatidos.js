import React from 'react';
import { Link } from 'react-router-dom';
import '../style/register.css';
function LoginBatidos() {
  return (
    <div>
      {/* Menú horizontal */}
      
      {/* Contenido principal */}
      <div className="contenido-principal">
        <h1>Bienvenido Prearador de Batidos!</h1>
        <p>¿Qué deseas hacer?</p>

        <div className="opciones-login">
          <Link to="/registrar" className="boton-opcion">Registrarse</Link>
          <Link to="/ingresarbatidos" className="boton-opcion">Ingresar</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginBatidos;
