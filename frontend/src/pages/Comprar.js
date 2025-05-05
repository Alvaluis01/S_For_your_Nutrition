// src/pages/Comprar.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import '../style/styles.css';
import '../style/products.css';

// Importa tus imágenes
import cupavena from '../image/cupave.png';
import batidoVainilla from '../image/cupvai.png';
import imagenDefault from '../image/cupave.png';
import malteada from '../image/malteada.png';

function Comprar() {
  const documentoCliente = localStorage.getItem('clienteDocumento');
  const [productos, setProductos] = useState([]);
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ingredientesAdicionales, setIngredientesAdicionales] = useState([]);
  
  // Usa el hook useCarrito correctamente
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    if (!documentoCliente) {
      alert('Por favor, inicia sesión para ver los productos');
      // Redirigir a login si lo deseas
    }
  }, [documentoCliente]);

  useEffect(() => {
    // Carga productos
    fetch('http://localhost/back_your_nutrition/public/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error productos:', error));

    // Carga ingredientes
    fetch('http://localhost/back_your_nutrition/public/ingredientes')
      .then(response => response.json())
      .then(data => setIngredientesDisponibles(data))
      .catch(error => console.error('Error ingredientes:', error));
  }, []);

  const obtenerImagenProducto = (nombreProducto) => {
    const nombre = nombreProducto?.toLowerCase() || '';
    switch (nombre) {
      case 'cupcake de avena': return cupavena;
      case 'malteada': return malteada;
      case 'cupcake de vainilla': return batidoVainilla;
      default: return imagenDefault;
    }
  };

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setIngredientesAdicionales([]);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoSeleccionado(null);
    setIngredientesAdicionales([]);
  };

  const agregarProducto = () => {
    if (!productoSeleccionado) return;
    
    const productoParaCarrito = {
      ...productoSeleccionado,
      id: Date.now(), // ID único
      ingredientesAdicionales: [...ingredientesAdicionales],
      cantidad: 1,
      precio: productoSeleccionado.Precio,
      imagen: obtenerImagenProducto(productoSeleccionado.Nombre) // Añade la imagen
    };
    
    agregarAlCarrito(productoParaCarrito);
    cerrarModal();
  };

  return (
    <div className="comprar-container">
      <nav className="menu-cliente">
        <div className="logo">
          <h2>S´ FOR YOUR NUTRITION</h2>
        </div>
        <ul className="menu-links">
          <li><Link to="/comprar">Ordenar</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          <li><Link to="/mi-cuenta">Mi Cuenta</Link></li>
        </ul>
      </nav>

      <h2 className="titulo-productos">Nuestros productos</h2>

      <div className="productos-grid">
        {productos.length === 0 ? (
          <p>Cargando productos...</p>
        ) : (
          productos.map((producto) => (
            <div 
              key={producto.Id} 
              className="producto-card" 
              onClick={() => abrirModal(producto)}
            >
              <img 
                src={obtenerImagenProducto(producto.Nombre)} 
                alt={producto.Nombre} 
                className="producto-imagen" 
              />
              <div className="producto-info">
                <h3>{producto.Nombre}</h3>
                <p><strong>Precio:</strong> ${producto.Precio}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {mostrarModal && productoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-cerrar" onClick={cerrarModal}>X</button>
            <img 
              src={obtenerImagenProducto(productoSeleccionado.Nombre)} 
              alt={productoSeleccionado.Nombre} 
              className="modal-imagen"
            />
            <h3>{productoSeleccionado.Nombre}</h3>
            <p><strong>Precio:</strong> ${productoSeleccionado.Precio}</p>
            <p><strong>Descripción:</strong> {productoSeleccionado.Descripcion}</p>

            <div className="ingredientes-adicionales">
              <h4>Ingredientes adicionales</h4>
              {ingredientesDisponibles.map((ingrediente) => (
                <label key={ingrediente.Id} className="ingrediente-option">
                  <input
                    type="checkbox"
                    checked={ingredientesAdicionales.includes(ingrediente.Nombre)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setIngredientesAdicionales([...ingredientesAdicionales, ingrediente.Nombre]);
                      } else {
                        setIngredientesAdicionales(
                          ingredientesAdicionales.filter(ing => ing !== ingrediente.Nombre)
                        );
                      }
                    }}
                  />
                  {ingrediente.Nombre}
                </label>
              ))}
            </div>

            <button 
              className="btn-agregar-carrito"
              onClick={agregarProducto}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comprar;