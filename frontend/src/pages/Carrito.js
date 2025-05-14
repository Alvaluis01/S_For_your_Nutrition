import React, { useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { Link } from 'react-router-dom';
import '../style/carrito.css'; 
// Importa tus imágenes de productos
import cupavena from '../image/cupave.png';
import batidoVainilla from '../image/cupvai.png';
import malteada from '../image/malteada.png';
import imagenDefault from '../image/cupave.png';

const Carrito = () => {
  const {
    carrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    calcularTotal
  } = useCarrito();

  const [editingItem, setEditingItem] = useState(null);
  const [nuevosIngredientes, setNuevosIngredientes] = useState([]);
  const [todosIngredientes, setTodosIngredientes] = useState([]);

  // Cargar los ingredientes disponibles al montar el componente
  React.useEffect(() => {
    fetch('http://localhost/back_your_nutrition/public/ingredientes')
      .then(response => response.json())
      .then(data => setTodosIngredientes(data))
      .catch(error => console.error('Error cargando ingredientes:', error));
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

  const handleFinalizarCompra = () => {
    window.location.href = "https://www.pse.com.co";
  };

  const iniciarEdicion = (item) => {
    setEditingItem(item.id);
    setNuevosIngredientes(item.ingredientesAdicionales || []);
  };

  const guardarCambios = (id) => {
    actualizarCantidad(id, 1, nuevosIngredientes);
    setEditingItem(null);
  };

  const toggleIngrediente = (ingrediente) => {
    setNuevosIngredientes(prev => 
      prev.includes(ingrediente)
        ? prev.filter(ing => ing !== ingrediente)
        : [...prev, ingrediente]
    );
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
      

      <div className="carrito-header">
        <h2>Tu Carrito de Compras</h2>
        <Link to="/comprar" className="btn-volver">
          ← Volver a Productos
        </Link>
      </div>
      
      {carrito.length === 0 ? (
        <div className="carrito-vacio">
          <p>No hay productos en tu carrito</p>
          <Link to="/comprar" className="btn-comprar">
            Ver Productos
          </Link>
        </div>
      ) : (
        <>
          <div className="items-carrito">
            {carrito.map((item) => (
              <div key={item.id} className="item-carrito">
                <div className="item-imagen-container">
                  <img 
                    src={obtenerImagenProducto(item.Nombre)} 
                    alt={item.Nombre}
                    className="item-imagen" 
                  />
                  <button 
                    onClick={() => eliminarDelCarrito(item.id)}
                    className="btn-eliminar"
                    aria-label="Eliminar producto"
                  >
                    ×
                  </button>
                </div>
                
                <div className="item-info">
                  <h3>{item.Nombre}</h3>
                  <p>Precio unitario: ${item.precio}</p>
                  
                  {editingItem === item.id ? (
                    <div className="edicion-ingredientes">
                      <h4>Modificar ingredientes adicionales:</h4>
                      <div className="lista-ingredientes">
                        {todosIngredientes.map(ingrediente => (
                          <label key={ingrediente.Id} className="ingrediente-option">
                            <input
                              type="checkbox"
                              checked={nuevosIngredientes.includes(ingrediente.Nombre)}
                              onChange={() => toggleIngrediente(ingrediente.Nombre)}
                            />
                            {ingrediente.Nombre}
                          </label>
                        ))}
                      </div>
                      <div className="acciones-edicion">
                        <button 
                          onClick={() => guardarCambios(item.id)}
                          className="btn-guardar"
                        >
                          Guardar Cambios
                        </button>
                        <button 
                          onClick={() => setEditingItem(null)}
                          className="btn-cancelar"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      {item.ingredientesAdicionales?.length > 0 && (
                        <div className="ingredientes-seleccionados">
                          <h4>Ingredientes adicionales:</h4>
                          <ul>
                            {item.ingredientesAdicionales.map((ingrediente, index) => (
                              <li key={index}>{ingrediente}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="controles-item">
                        <div className="contador-cantidad">
                          <button 
                            className="btn-cantidad menos"
                            onClick={() => item.cantidad > 1 
                              ? actualizarCantidad(item.id, item.cantidad - 1)
                              : null
                            }
                            disabled={item.cantidad <= 1}
                          >
                            −
                          </button>
                          <span className="cantidad">{item.cantidad}</span>
                          <button 
                            className="btn-cantidad mas"
                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => iniciarEdicion(item)}
                          className="btn-modificar"
                        >
                          Modificar
                        </button>
                      </div>
                    </>
                  )}



                  
                  <p className="subtotal">Subtotal: ${(item.precio * item.cantidad).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="resumen-carrito">
  <h3>Resumen de Compra</h3>

  <div className="lista-productos-resumen">
    {carrito.map((item) => (
      <div key={item.id} className="producto-resumen">
        <p><strong>{item.Nombre}</strong> × {item.cantidad}</p>
        {item.ingredientesAdicionales?.length > 0 && (
          <ul className="ingredientes-resumen">
            {item.ingredientesAdicionales.map((ing, index) => (
              <li key={index}>+ {ing}</li>
            ))}
          </ul>
        )}
        <p>Total: ${(item.precio * item.cantidad).toFixed(2)}</p>
        <hr />
      </div>
    ))}
  </div>

  <div className="total">
    <span>Total:</span>
    <span>${calcularTotal().toFixed(2)}</span>
  </div>

  <div className="acciones-carrito">
    <button onClick={vaciarCarrito} className="btn-vaciar">
      Vaciar Carrito
    </button>
    <button 
      onClick={handleFinalizarCompra}
      className="btn-finalizar"
    >
      Finalizar Compra (PSE)
    </button>
  </div>
</div>


        </>
      )}
    </div>
  );
};

export default Carrito;