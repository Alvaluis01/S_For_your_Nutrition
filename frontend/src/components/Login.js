// src/components/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const goToCliente = () => {
    navigate('/LoginCliente');
  };

  const goToAdministrativo = () => {
    navigate('/LoginAdmin');
  };

  return (
    <div className="auth-container">
      <div className="logo-section">
        <h1>S´ FOR YOUR NUTRITION</h1>
        <p>BATIDOS</p>
      </div>
      <h2>¡Conéctate!</h2>
      <p className="subtitle">Inicia sesión para continuar</p>

      <div className="auth-form">
        <button onClick={goToCliente} className="btn-primary">Cliente</button>
        <button onClick={goToAdministrativo} className="btn-primary">Administrativo</button>
      </div>
    </div>
  );
}

export default Login;
