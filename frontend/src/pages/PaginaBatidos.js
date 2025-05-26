import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import '../style/pedidos.css';

function Pedidos() {
  const { carrito, vaciarCarrito, calcularTotal } = useCarrito();
  const [pedidos, setPedidos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    cliente: '',
    productos: [],
    fecha: '',
    estado: 'pendiente',
    tipoPedido: 'local' // Nuevo campo
  });
  const [todosIngredientes, setTodosIngredientes] = useState([]);
  const [editingProductIndex, setEditingProductIndex] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar ingredientes disponibles
  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const response = await fetch('http://localhost:8000/ingredientes');
        const data = await response.json();
        setTodosIngredientes(data);
      } catch (error) {
        console.error('Error cargando ingredientes:', error);
      }
    };

    fetchIngredientes();
  }, []);

  // Cargar pedidos al montar el componente
  useEffect(() => {
    const loadPedidos = () => {
      try {
        const savedPedidos = localStorage.getItem('pedidos');
        if (savedPedidos) {
          const parsedPedidos = JSON.parse(savedPedidos);
          if (Array.isArray(parsedPedidos)) {
            setPedidos(parsedPedidos);
          }
        }
      } catch (error) {
        console.error('Error al cargar pedidos:', error);
        const backup = localStorage.getItem('pedidos_backup');
        if (backup) {
          try {
            const parsedBackup = JSON.parse(backup);
            if (Array.isArray(parsedBackup)) {
              setPedidos(parsedBackup);
            }
          } catch (e) {
            console.error('Error al cargar backup:', e);
          }
        }
      } finally {
        setIsLoaded(true);
      }
    };

    loadPedidos();

    const handleStorageChange = (e) => {
      if (e.key === 'pedidos') {
        loadPedidos();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Guardar pedidos cuando cambian
  useEffect(() => {
    if (!isLoaded) return;

    const savePedidos = () => {
      try {
        const currentPedidos = localStorage.getItem('pedidos');
        if (currentPedidos) {
          localStorage.setItem('pedidos_backup', currentPedidos);
        }

        localStorage.setItem('pedidos', JSON.stringify(pedidos));
      } catch (error) {
        console.error('Error al guardar pedidos:', error);
      }
    };

    savePedidos();
  }, [pedidos, isLoaded]);

  // Registrar nuevo pedido
  const registrarPedidoDesdeCarrito = () => {
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const nuevoPedido = {
      id: Date.now(),
      cliente: 'Cliente Actual',
      productos: carrito.map(item => ({
        ...item,
        ingredientesAdicionales: item.ingredientesAdicionales || []
      })),
      fecha: new Date().toISOString().split('T')[0],
      total: calcularTotal(),
      estado: 'pendiente',
      tipoPedido: 'local' // Valor por defecto
    };

    setPedidos(prev => {
      const newPedidos = [...prev, nuevoPedido];
      try {
        localStorage.setItem('pedidos', JSON.stringify(newPedidos));
      } catch (error) {
        console.error('Error al guardar inmediatamente:', error);
      }
      return newPedidos;
    });

    vaciarCarrito();
    alert('Pedido registrado exitosamente');
  };

  const iniciarEdicion = (pedido) => {
    setEditingId(pedido.id);
    setEditForm({
      cliente: pedido.cliente || '',
      productos: [...pedido.productos],
      fecha: pedido.fecha || '',
      estado: pedido.estado || 'pendiente',
      tipoPedido: pedido.tipoPedido || 'local' // Incluir tipoPedido
    });
    setEditingProductIndex(null);
    setEditingProduct(null);
  };

  const calcularTotalPedido = (productos) => {
    return productos.reduce((total, producto) => {
      const subtotal = producto.precio * producto.cantidad;
      return total + subtotal;
    }, 0);
  };

  const guardarEdicion = () => {
    const totalCalculado = calcularTotalPedido(editForm.productos);

    setPedidos(pedidos.map(pedido => 
      pedido.id === editingId 
        ? { 
            ...pedido,
            cliente: editForm.cliente,
            productos: editForm.productos,
            fecha: editForm.fecha,
            total: totalCalculado,
            estado: editForm.estado,
            tipoPedido: editForm.tipoPedido // Incluir tipoPedido
          } 
        : pedido
    ));
    setEditingId(null);
  };

  const eliminarPedido = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este pedido?')) {
      setPedidos(pedidos.filter(pedido => pedido.id !== id));
    }
  };

  const iniciarEdicionProducto = (productIndex) => {
    setEditingProductIndex(productIndex);
    setEditingProduct({ ...editForm.productos[productIndex] });
  };

  const guardarEdicionProducto = () => {
    const nuevosProductos = [...editForm.productos];
    nuevosProductos[editingProductIndex] = editingProduct;
    setEditForm({ ...editForm, productos: nuevosProductos });
    setEditingProductIndex(null);
    setEditingProduct(null);
  };

  const toggleIngrediente = (ingrediente) => {
    setEditingProduct(prev => {
      const nuevosIngredientes = prev.ingredientesAdicionales?.includes(ingrediente)
        ? prev.ingredientesAdicionales.filter(ing => ing !== ingrediente)
        : [...(prev.ingredientesAdicionales || []), ingrediente];
      
      return {
        ...prev,
        ingredientesAdicionales: nuevosIngredientes
      };
    });
  };

  const eliminarProducto = (index) => {
    if (window.confirm('¿Eliminar este producto del pedido?')) {
      const nuevosProductos = [...editForm.productos];
      nuevosProductos.splice(index, 1);
      setEditForm({ ...editForm, productos: nuevosProductos });
      setEditingProductIndex(null);
      setEditingProduct(null);
    }
  };

  const actualizarCantidadProducto = (cantidad) => {
    if (cantidad > 0) {
      setEditingProduct(prev => ({
        ...prev,
        cantidad: cantidad
      }));
    }
  };

  const estadosPosibles = [
    'pendiente',
    'confirmado',
    'en preparación',
    'listo para entrega',
    'entregado',
    'cancelado'
  ];

  const formatProductos = (productos, isEditable = false) => {
    if (!productos || !Array.isArray(productos)) return "No hay productos";
    
    return productos.map((producto, index) => (
      <div key={`${producto.id}-${producto.Nombre}-${index}`} className="producto-item">
        {editingProductIndex === index ? (
          <div className="editar-producto">
            <h4>Editando: {producto.Nombre}</h4>
            
            <div className="form-group">
              <label>Cantidad:</label>
              <div className="cantidad-control">
                <button 
                  onClick={() => actualizarCantidadProducto(editingProduct.cantidad - 1)}
                  disabled={editingProduct.cantidad <= 1}
                >
                  -
                </button>
                <span>{editingProduct.cantidad}</span>
                <button onClick={() => actualizarCantidadProducto(editingProduct.cantidad + 1)}>
                  +
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label>Ingredientes adicionales:</label>
              <div className="ingredientes-options">
                {todosIngredientes.map(ing => (
                  <label key={ing.Id} className="ingrediente-option">
                    <input
                      type="checkbox"
                      checked={editingProduct.ingredientesAdicionales?.includes(ing.Nombre)}
                      onChange={() => toggleIngrediente(ing.Nombre)}
                    />
                    {ing.Nombre}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="acciones-producto">
              <button onClick={guardarEdicionProducto} className="btn-guardar">
                Guardar
              </button>
              <button 
                onClick={() => eliminarProducto(index)}
                className="btn-eliminar"
              >
                Eliminar Producto
              </button>
              <button 
                onClick={() => {
                  setEditingProductIndex(null);
                  setEditingProduct(null);
                }}
                className="btn-cancelar"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="producto-header">
              <h4>{producto.Nombre}</h4>
              {isEditable && (
                <button 
                  onClick={() => iniciarEdicionProducto(index)}
                  className="btn-editar-producto"
                >
                  Editar
                </button>
              )}
            </div>
            <p>
              <strong>Cantidad:</strong> {producto.cantidad} | 
              <strong> Precio unitario:</strong> ${producto.precio} | 
              <strong> Subtotal:</strong> ${(producto.precio * producto.cantidad).toFixed(2)}
            </p>
            {producto.ingredientesAdicionales?.length > 0 && (
              <ul className="ingredientes-list">
                {producto.ingredientesAdicionales.map((ing, i) => (
                  <li key={i}>+ {ing}</li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    ));
  };

  return (
    <div className="pedidos-container">
      

      <div className="contenido-pedidos">
        <h2>Gestión de Pedidos</h2>
        
        <div className="acciones-principales">
          <button 
            onClick={registrarPedidoDesdeCarrito}
            className="btn-registrar"
            disabled={carrito.length === 0}
          >
            Registrar Pedido desde Carrito
          </button>
        </div>

        <div className="lista-pedidos">
          {pedidos.length === 0 ? (
            <p className="no-pedidos">No hay pedidos registrados</p>
          ) : (
            pedidos.map(pedido => (
              <div key={pedido.id} className="pedido-card">
                {editingId === pedido.id ? (
                  <div className="editar-pedido">
                    <div className="form-group">
                      <label>Cliente:</label>
                      <input
                        type="text"
                        value={editForm.cliente}
                        onChange={(e) => setEditForm({...editForm, cliente: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Fecha:</label>
                      <input
                        type="date"
                        value={editForm.fecha}
                        onChange={(e) => setEditForm({...editForm, fecha: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Estado:</label>
                      <select
                        value={editForm.estado}
                        onChange={(e) => setEditForm({...editForm, estado: e.target.value})}
                      >
                        {estadosPosibles.map(estado => (
                          <option key={estado} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Tipo de pedido:</label>
                      <div className="opciones-tipo-pedido">
                        <label>
                          <input
                            type="radio"
                            name="tipoPedido"
                            value="local"
                            checked={editForm.tipoPedido === 'local'}
                            onChange={() => setEditForm({...editForm, tipoPedido: 'local'})}
                          />
                          Local
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="tipoPedido"
                            value="domicilio"
                            checked={editForm.tipoPedido === 'domicilio'}
                            onChange={() => setEditForm({...editForm, tipoPedido: 'domicilio'})}
                          />
                          Domicilio
                        </label>
                      </div>
                    </div>
                    
                    <div className="productos-edit">
                      <h4>Productos:</h4>
                      {formatProductos(editForm.productos, true)}
                    </div>
                    
                    <div className="acciones-edicion">
                      <button onClick={guardarEdicion} className="btn-guardar">
                        Guardar Cambios
                      </button>
                      <button 
                        onClick={() => setEditingId(null)}
                        className="btn-cancelar"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="pedido-header">
                      <h3>Pedido #{pedido.id}</h3>
                      <div className="pedido-meta">
                        <span className="fecha-pedido">{pedido.fecha}</span>
                        <span className={`estado-pedido ${pedido.estado}`}>
                          {pedido.estado || 'pendiente'}
                        </span>
                        <span className={`tipo-pedido ${pedido.tipoPedido}`}>
                          {pedido.tipoPedido === 'domicilio' ? 'Domicilio' : 'Local'}
                        </span>
                      </div>
                    </div>
                    <div className="pedido-info">
                      <p><strong>Cliente:</strong> {pedido.cliente || 'No especificado'}</p>
                      <p><strong>Tipo:</strong> {pedido.tipoPedido === 'domicilio' ? 'Domicilio' : 'Recoger en local'}</p>
                      <p><strong>Productos:</strong></p>
                      <div className="productos-list">
                        {formatProductos(pedido.productos)}
                      </div>
                      <p className="total-pedido">
                        <strong>Total:</strong> ${pedido.total?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                    <div className="pedido-acciones">
                      <button 
                        onClick={() => iniciarEdicion(pedido)}
                        className="btn-editar"
                      >
                        Editar Pedido
                      </button>
                      <button 
                        onClick={() => eliminarPedido(pedido.id)}
                        className="btn-eliminar"
                      >
                        Eliminar Pedido
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Pedidos;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';


// function PaginaAdmin() {
  
  
  
//   return (
//     <div>
      
//       <nav className="menu-cliente">
//         <div className="contenido-cliente">
//           <div className="logo">
//             <h2>S´ FOR YOUR NUTRITION</h2>
//           </div>
//           <ul className="menu-links">
//             <li><Link to="/pedidos">Pedidos</Link></li>
//             <li><Link to="/micuentaadmin">Mi Cuenta</Link></li>
//           </ul>
//         </div>
//       </nav>
//       <h1>Bienvenido Preparador de batidos🥤</h1>
      
//     </div>
//   );
// }

// export default PaginaAdmin;