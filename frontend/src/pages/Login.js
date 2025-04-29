import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [role, setRole] = useState('');  // 'admin' o 'cliente'
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role) {
      // Guardar el rol del usuario en localStorage
      localStorage.setItem('userRole', role);
      // Redirigir a la página correspondiente
      navigate(`/${role}`);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <button onClick={() => setRole('admin')}>Iniciar sesión como Admin</button>
      <button onClick={() => setRole('cliente')}>Iniciar sesión como Cliente</button>
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}

export default Login;
