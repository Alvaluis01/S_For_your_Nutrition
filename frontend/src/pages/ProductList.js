import React, { useEffect, useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import '../style/products.css';

function ProductosList() {
  const [productos, setProductos] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    // Cargar productos
    fetch('http://localhost/back_your_nutrition/public/productos')
      .then(res => res.json())
      .then(setProductos)
      .catch(console.error);

    // Cargar ingredientes disponibles
    fetch('http://localhost/back_your_nutrition/public/ingredientes')
      .then(res => res.json())
      .then(setIngredientes)
      .catch(console.error);
  }, []);

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setIngredientesSeleccionados([]);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const toggleIngrediente = (ingrediente) => {
    setIngredientesSeleccionados(prev => 
      prev.includes(ingrediente) 
        ? prev.filter(i => i !== ingrediente) 
        : [...prev, ingrediente]
    );
  };

  const agregarProductoAlCarrito = () => {
    if (!productoSeleccionado) return;
    
    const productoConIngredientes = {
      ...productoSeleccionado,
      IngredientesAdicionales: ingredientesSeleccionados,
      Precio: (
        parseFloat(productoSeleccionado.Precio) + 
        (ingredientesSeleccionados.length * 0.5)
      ).toFixed(2)
    };
    
    agregarAlCarrito(productoConIngredientes);
    cerrarModal();
  };

  return (
    <div className="productos-container">
      <h2>Nuestros Productos</h2>
      <div className="productos-grid">
        {productos.map(producto => (
          <div key={producto.Id} className="producto-card" onClick={() => abrirModal(producto)}>
            <img src={`/images/${producto.Nombre.toLowerCase().replace(/\s/g, '-')}.jpg`} 
                 alt={producto.Nombre} 
                 className="producto-imagen" />
            <div className="producto-info">
              <h3>{producto.Nombre}</h3>
              <p>${producto.Precio}</p>
            </div>
          </div>
        ))}
      </div>

      {mostrarModal && productoSeleccionado && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-cerrar" onClick={cerrarModal}>×</button>
            <h3>{productoSeleccionado.Nombre}</h3>
            <p>{productoSeleccionado.Descripcion}</p>
            <p>Precio base: ${productoSeleccionado.Precio}</p>
            
            <div className="ingredientes-section">
              <h4>Ingredientes adicionales (+$0.50 c/u):</h4>
              {ingredientes.map(ing => (
                <label key={ing.Id} className="ingrediente-option">
                  <input
                    type="checkbox"
                    checked={ingredientesSeleccionados.includes(ing.Nombre)}
                    onChange={() => toggleIngrediente(ing.Nombre)}
                  />
                  {ing.Nombre}
                </label>
              ))}
            </div>

            <div className="modal-actions">
              <button onClick={agregarProductoAlCarrito}>Agregar al Carrito</button>
              <button onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductosList;