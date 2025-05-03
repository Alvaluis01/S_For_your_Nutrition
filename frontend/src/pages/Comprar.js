import React, { useEffect, useState } from 'react';
import '../style/styles.css';
import '../style/products.css';

import cupavena from '../image/cupave.png';
import batidoVainilla from '../image/cupvai.png';
import imagenDefault from '../image/cupave.png';
import malteada from '../image/malteada.png';
import { Link } from 'react-router-dom';

function ProductosList() {
  const documentoCliente = localStorage.getItem('clienteDocumento');

  const [productos, setProductos] = useState([]);
  const [ingredientesDisponibles, setIngredientesDisponibles] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ingredientesAdicionales, setIngredientesAdicionales] = useState([]);
  const [carrito, setCarrito] = useState([]);
  useEffect(() => {
    if (!documentoCliente) {
      alert('Por favor, inicia sesión para ver los productos');
      // Redirigir si usas React Router:
      // navigate('/login');
    }
  }, []);
  
  useEffect(() => {
    fetch('http://localhost/back_your_nutrition/public/productos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error productos:', error));

    fetch('http://localhost/back_your_nutrition/public/ingredientes')
      .then((response) => response.json())
      .then((data) => setIngredientesDisponibles(data))
      .catch((error) => console.error('Error ingredientes:', error));
  }, []);

  const obtenerImagenProducto = (nombreProducto) => {
    const nombre = nombreProducto?.toLowerCase() || '';
    switch (nombre) {
      case 'cupcake de avena':
        return cupavena;
      case 'malteada':
        return malteada;
      case 'cupcake de vainilla':
        return batidoVainilla;
      default:
        return imagenDefault;
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

  const agregarAlCarrito = () => {
    const productoConIngredientes = {
      ...productoSeleccionado,
      IngredientesAdicionales: [...ingredientesAdicionales],
    };
    setCarrito([...carrito, productoConIngredientes]);
    cerrarModal();
  };

  return (
    <div>
      <nav className="menu-cliente">
        <div className="logo">
          <h2>S´ FOR YOUR NUTRITION</h2>
        </div>
        <ul className="menu-links">
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/comprar">Ordenar</Link></li>
          <li><Link to="/carrito">Carrito</Link></li>
          <li><Link to="/mi-cuenta">Mi Cuenta</Link></li>
        </ul>
      </nav>

      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Nuestros productos</h2>

      <div className="productos-grid">
        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          productos.map((producto) => (
            <div key={producto.Id} className="producto-card" onClick={() => abrirModal(producto)}>
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
            <p><strong>Tamaño:</strong> {productoSeleccionado.Tamaño} g</p>
            <p><strong>Calorías:</strong> {productoSeleccionado.Calorias} kcal</p>

            <div style={{ marginTop: '20px' }}>
              <h4>Seleccionar ingredientes adicionales</h4>
              <div className="checklist-container">
                {ingredientesDisponibles.map((ingrediente) => (
                  <label key={ingrediente.Id} className="checklist-item">
                    <input
                      type="checkbox"
                      value={ingrediente.Nombre}
                      checked={ingredientesAdicionales.includes(ingrediente.Nombre)}
                      onChange={(e) => {
                        const seleccionado = e.target.checked;
                        if (seleccionado) {
                          setIngredientesAdicionales([...ingredientesAdicionales, ingrediente.Nombre]);
                        } else {
                          setIngredientesAdicionales(
                            ingredientesAdicionales.filter((ing) => ing !== ingrediente.Nombre)
                          );
                        }
                      }}
                    />
                    {ingrediente.Nombre}
                  </label>
                ))}
              </div>
              <button style={{ marginTop: '15px' }} onClick={agregarAlCarrito}>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="carrito">
        <h3>Carrito de compras</h3>
        {carrito.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <ul>
            {carrito.map((item, index) => (
              <li key={index}>
                {item.Nombre} - ${item.Precio}
                {item.IngredientesAdicionales && item.IngredientesAdicionales.length > 0 && (
                  <p><strong>Ingredientes Adicionales:</strong> {item.IngredientesAdicionales.join(', ')}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ProductosList;
