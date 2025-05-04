// src/pages/ProductosList.js
import React, { useEffect, useState } from 'react';
import '../style/styles.css';
import '../style/products.css';

import cupavena from '../image/cupave.png';
import batidoVainilla from '../image/cupvai.png';
import imagenDefault from '../image/cupave.png';
import malteada from '../image/malteada.png';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

function ProductosList() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
  const { agregarAlCarrito } = useCarrito(); // Usamos el hook del contexto

  useEffect(() => {
    fetch('http://localhost/back_your_nutrition/public/productos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error('Error:', error));
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
    setIngredientesSeleccionados([]);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setProductoSeleccionado(null);
    setIngredientesSeleccionados([]);
    setMostrarModal(false);
  };

  const agregarIngrediente = () => {
    const nuevo = prompt('Ingresa un ingrediente adicional:');
    if (nuevo) {
      setIngredientesSeleccionados(prev => [...prev, nuevo]);
    }
  };

  const confirmarYAgregar = () => {
    const productoConIngredientes = {
      ...productoSeleccionado,
      ingredientes: ingredientesSeleccionados,
    };
    agregarAlCarrito(productoConIngredientes);
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

      <h2 style={{ textAlign: 'center' }}>Nuestros productos</h2>
      <div className="productos-grid">
        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          productos.map(producto => (
            <div key={producto.Id} className="producto-card" onClick={() => abrirModal(producto)}>
              <img src={obtenerImagenProducto(producto.Nombre)} alt={producto.Nombre} className="producto-imagen" />
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
            <img src={obtenerImagenProducto(productoSeleccionado.Nombre)} alt={productoSeleccionado.Nombre} className="modal-imagen" />
            <h3>{productoSeleccionado.Nombre}</h3>
            <p><strong>Precio:</strong> ${productoSeleccionado.Precio}</p>
            <p><strong>Descripción:</strong> {productoSeleccionado.Descripcion}</p>
            <p><strong>Tamaño:</strong> {productoSeleccionado.Tamaño} g</p>
            <p><strong>Calorías:</strong> {productoSeleccionado.Calorias} kcal</p>
            <p><strong>Ingredientes adicionales:</strong> {ingredientesSeleccionados.join(', ') || 'Ninguno'}</p>
            <button onClick={agregarIngrediente}>Agregar ingrediente adicional</button>
            <button onClick={confirmarYAgregar}>Añadir al carrito</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductosList;
