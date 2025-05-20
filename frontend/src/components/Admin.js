import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/loginadmin');  // ✅ Redirige a la ruta correcta
  };
  

  return (
    <div className="auth-container">
      <div className="logo-section">
        <h1>Admin</h1>
        <p>BATIDOS</p>
      </div>
      <h2>¡Conéctate!</h2>
      <p className="subtitle">Inicia sesión para continuar</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit" className="btn-primary">Ingresar</button>
        <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
      </form>

      <div className="divider">o</div>

      <div className="social-login">
        <button className="google-btn"></button>
        <button className="facebook-btn"></button>
      </div>

      <p className="switch-auth">
        ¿No tienes cuenta? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/registro')}>Regístrate</span>
      </p>
    </div>
  );
}

export default Login;
