import React from 'react';
import './Register.css';

function Register() {
  return (
    <div className="auth-container">
      <div className="logo-section">
        <h1>STAY FIT</h1>
        <p>BATIDOS</p>
      </div>
      <h2>Crea tu cuenta</h2>
      <p className="subtitle">¡Únete a nosotros!</p>

      <form className="auth-form">
        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Apellido" />
        <input type="text" placeholder="Dirección" />
        <input type="email" placeholder="Correo electrónico" />
        <input type="text" placeholder="Teléfono" />
        <input type="password" placeholder="Contraseña" />
        <input type="password" placeholder="Confirmar contraseña" />
        
        <div className="checkbox-terms">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            He leído y acepto los <a href="#">términos y condiciones</a>
          </label>
        </div>

        <button type="submit" className="btn-primary">Crear cuenta</button>
      </form>

      <div className="divider">o</div>

      <div className="social-login">
        <button className="google-btn"></button>
        <button className="facebook-btn"></button>
      </div>

      <p className="switch-auth">
        ¿Ya tienes cuenta? <a href="#">Inicia sesión</a>
      </p>
    </div>
  );
}

export default Register;
