import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'; // Importa useEffect y useState

function Bienvenida() {
  const [personas, setPersona] = useState(null);

  useEffect(() => {
    // Recuperar los datos de la persona del localStorage
    const storedPersona = JSON.parse(localStorage.getItem('personas'));
    if (storedPersona) {
      setPersona(storedPersona); // Si existe, actualizar el estado con los datos de la persona
    }
  }, []);

  return (
    <div className="bienvenida-container">
      {/* Mostrar un mensaje de bienvenida utilizando la variable persona */}
     
      
      <nav className="menu-cliente">
        <div className="contenido-cliente">
          <div className="logo">
            <h2>S´ FOR YOUR NUTRITION</h2>
          </div>
          <ul className="menu-links">
            <li><Link to="/comprar">Ordenar</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/micuentacliente">Mi Cuenta</Link></li>
          </ul>
        </div>
      </nav>

      {/* Mensaje adicional si quieres reforzar la bienvenida */}
      <h2>Bienvenido nuevamente {personas?.Nombres || 'Cliente'} 🥤</h2>
    </div>
  );
}

export default Bienvenida;
