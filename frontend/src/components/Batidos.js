import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';

function LoginBatidos() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    // Aquí tu lógica para validar el login (si es correcta)
    setIsLoggedIn(true);  // Supongamos que la validación fue correcta

    // Si el login es exitoso:
    if (isLoggedIn) {
      navigate('/loginbatidos');  // Redirige al panel de cliente
    }else{
        navigate('/loginbatidos'); 
    }
  }

  return (
    <div className="auth-container">
      <h1>Login Prearador de batidos</h1>
      <form onSubmit={handleLogin} className="auth-form">
        <input type="text" placeholder="Usuario" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit" className="btn-primary">Ingresar</button>
      </form>
    </div>
  );
}

export default LoginBatidos;
