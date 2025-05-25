import React, { useState, useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';
import '../style/products.css';
import { imagenes } from '../image';

function PaginaBatidos() {
  const [batidos, setBatidos] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ingredientesSeleccionados, setIngredientesSeleccionados] = useState([]);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    // Cargar batidos
    fetch('http://localhost:8000/batidos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBatidos(data);
        } else {
          console.error('Los datos recibidos no son un array:', data);
          setBatidos([]);
        }
      })
      .catch(err => {
        console.error('Error cargando batidos:', err);
        setBatidos([]);
      });

    // Cargar ingredientes
    fetch('http://localhost:8000/ingredientes')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setIngredientes(data);
        } else {
          console.error('Los datos recibidos no son un array:', data);
          setIngredientes([]);
        }
      })
      .catch(err => {
        console.error('Error cargando ingredientes:', err);
        setIngredientes([]);
      });
  }, []);

  const abrirModal = (batido) => {
    if (!batido?.id) {
      console.error('Batido no válido:', batido);
      return;
    }
    setProductoSeleccionado(batido);
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
    if (!productoSeleccionado?.id) {
      console.error('No hay producto seleccionado válido');
      return;
    }
    
    const productoConIngredientes = {
      ...productoSeleccionado,
      ingredientesAdicionales: ingredientesSeleccionados,
      precioFinal: (
        parseFloat(productoSeleccionado.Precio) + 
        (ingredientesSeleccionados.length * 0.5)
      ).toFixed(2)
    };
    
    agregarAlCarrito(productoConIngredientes);
    cerrarModal();
  };

  return (
    <div className="productos-container">
      <h1>Nuestros Batidos</h1>
      <div className="productos-grid">
        {batidos.map(batido => (
          <div 
            key={`batido-${batido.id}`}
            className="producto-card" 
            onClick={() => abrirModal(batido)}
          >
            <img 
              src={imagenes[batido.Nombre?.toLowerCase()] || imagenes.default} 
              alt={batido.Nombre} 
              className="producto-imagen" 
              onError={(e) => {
                e.target.src = imagenes.default;
              }}
            />
            <div className="producto-info">
              <h3>{batido.Nombre || 'Nombre no disponible'}</h3>
              <p>${batido.Precio?.toFixed(2) || '0.00'}</p>
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
            <p>Precio base: ${productoSeleccionado.Precio?.toFixed(2)}</p>
            
            <div className="ingredientes-section">
              <h4>Ingredientes adicionales (+$0.50 c/u):</h4>
              {ingredientes.map(ing => (
                <label key={`ing-${ing.id}`} className="ingrediente-option">
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
              <button onClick={agregarProductoAlCarrito}>
                Agregar al Carrito (${(
                  parseFloat(productoSeleccionado.Precio) + 
                  (ingredientesSeleccionados.length * 0.5)
                ).toFixed(2)})
              </button>
              <button onClick={cerrarModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaginaBatidos;