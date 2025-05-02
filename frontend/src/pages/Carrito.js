
import { useCarrito } from './CarritoProvider';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import { CarritoContext } from './CarritoProvider'; // Ajusta la ruta si es necesario


const Carrito = () => {
    const { carrito, eliminarDelCarrito, vaciarCarrito } = useContext(CarritoContext);
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
  return (
    <div>
      <nav className="menu-cliente">
        <div className="contenido-cliente">
          <div className="logo">
            <h2>S´ FOR YOUR NUTRITION</h2>
          </div>
          <ul className="menu-links">
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/comprar">Ordenar</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/mi-cuenta">Mi Cuenta</Link></li>
          </ul>
        </div>
      </nav>

      <div>
      <h2>Carrito</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul>
            {carrito.map((item, index) => (
              <li key={index}>
                {item.nombre} - ${item.precio}
                <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <p>Total: ${total}</p>
          <button onClick={vaciarCarrito}>Vaciar carrito</button>
        </>
      )}
    </div>
    </div>
  );
};

export default Carrito;
