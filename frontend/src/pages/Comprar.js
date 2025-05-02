import React, { useEffect, useState } from 'react';
import '../style/styles.css';
import '../style/products.css';

import cupavena from '../image/cupave.png';
import batidoVainilla from '../image/cupvai.png';
import imagenDefault from '../image/cupave.png';
import malteada from '../image/malteada.png';
import { Link } from 'react-router-dom'; // Usar Link para navegación


function ProductosList() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [carrito, setCarrito] = useState([]);

  const producto = {
    nombre: 'Ejemplo',
    precio: 10,
    ingredientes: ['avena', 'canela']
  };

  useEffect(() => {
    fetch('http://localhost/back_your_nutrition/public/productos')
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
      })
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
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setProductoSeleccionado(null);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    setMostrarModal(false);
  };

  const agregarIngredienteAdicional = () => {
    const ingrediente = prompt("¿Qué ingrediente adicional te gustaría agregar?");
    if (ingrediente) {
      const productoConIngrediente = {
        ...productoSeleccionado,
        IngredienteAdicional: ingrediente,
      };
      setCarrito([...carrito, productoConIngrediente]);
    }
    setMostrarModal(false);
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

      {/* Modal */}
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

            {/* Botones para agregar al carrito o agregar ingredientes */}
            <div>
            <div>
              <h2>Ordenar productos</h2>
                <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
            </div>
            <div>
              <button onClick={agregarIngredienteAdicional}>
                  Agregar ingrediente adicional
              </button>
            </div>

              
            </div>
          </div>
        </div>
      )}

      {/* Mostrar carrito */}
      <div className="carrito">
        <h3>Carrito de compras</h3>
        {carrito.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <ul>
            {carrito.map((item, index) => (
              <li key={index}>
                {item.Nombre} - ${item.Precio}
                {item.IngredienteAdicional && (
                  <p><strong>Ingrediente Adicional:</strong> {item.IngredienteAdicional}</p>
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
