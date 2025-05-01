import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [role, setRole] = useState('');  // 'admin' o 'cliente'
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role) {
        
      localStorage.setItem('userRole', role);
      
      navigate(`/${role}`);
    }
  };

  return (
    <div>
      <h2>pagina cliente</h2>
      <nav className="menu-cliente">
        <div className="contenido-cliente">
          <div className="logo">
            <h2>STAY FIT</h2>
          </div>
          <ul className="menu-links">
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/comprar">Ordenar</Link></li>
            <li><Link to="/pedido">Carrito</Link></li>
            <li><Link to="/mi-cuenta">Mi Cuenta</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Login;
