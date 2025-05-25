import React, { useState, useEffect } from 'react';
import '../style/inventario.css';
import { Link } from 'react-router-dom';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [formData, setFormData] = useState({
    Nombre: '',
    Precio: '',
    Cantidad: '0',
    Descripcion: '',
    Tamaño: '',
    Calorias: '',
    Disponibilidad: '1'
  });
  const [editandoId, setEditandoId] = useState(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  // Cargar productos
  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const res = await fetch('http://localhost:8000/productos');
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      setError('Error al cargar productos');
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id);
    setFormData({
      Nombre: producto.Nombre,
      Precio: producto.Precio,
      Cantidad: producto.Cantidad,
      Descripcion: producto.Descripcion,
      Tamaño: producto.Tamaño,
      Calorias: producto.Calorias,
      Disponibilidad: producto.Disponibilidad
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormData({
      Nombre: '',
      Precio: '',
      Cantidad: '0',
      Descripcion: '',
      Tamaño: '',
      Calorias: '',
      Disponibilidad: '1'
    });
  };

  const agregarProducto = async () => {
    try {
      const response = await fetch('http://localhost:8000/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setProductos([...productos, data]);
      cancelarEdicion();
      cargarProductos(); // Recargar la lista
    } catch (error) {
      setError('Error al agregar producto');
    }
  };

  const guardarModificacion = async () => {
    try {
      const response = await fetch(`http://localhost:8000/productos/${editandoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setProductos(productos.map(p => p.id === editandoId ? data : p));
      cancelarEdicion();
      cargarProductos(); // Recargar la lista
    } catch (error) {
      setError('Error al guardar cambios');
    }
  };

  const eliminarProducto = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await fetch(`http://localhost:8000/productos/${id}`, { method: 'DELETE' });
        setProductos(productos.filter(p => p.id !== id));
        cargarProductos(); // Recargar la lista
      } catch (error) {
        setError('Error al eliminar producto');
      }
    }
  };

  if (cargando) return <div className="cargando">Cargando...</div>;

  return (
    <div>
      {/* Menú de navegación */}
      <nav className="menu-cliente">
        <div className="contenido-cliente">
          <div className="logo"><h2>S´ FOR YOUR NUTRITION</h2></div>
          <ul className="menu-links">
            <li><Link to="/pedidos">Pedidos</Link></li>
            <li><Link to="/notificaciones">Notificaciones</Link></li>
            <li><Link to="/inventario">Inventario</Link></li>
            <li><Link to="/micuentaadmin">Mi Cuenta</Link></li>
          </ul>
        </div>
      </nav>

      <h1>Bienvenido nuevamente Admin🥤</h1>

      <div className="inventario">
        <h2>Inventario</h2>

        {error && <div className="error-message">{error}</div>}

        {/* Formulario */}
        <div className="formulario">
          <div className="form-group">
            <label>Nombre del Producto</label>
            <select
              name="Nombre"
              value={formData.Nombre}
              onChange={handleChange}
              disabled={editandoId ? true : false} // Deshabilitado en modo edición
            >
              <option value="">Seleccione un producto</option>
              {productos.map(producto => (
                <option key={`opt-${producto.id}`} value={producto.Nombre}>
                  {producto.Nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Precio ($)</label>
              <input
                name="Precio"
                type="number"
                min="0"
                step="0.01"
                value={formData.Precio}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Cantidad</label>
              <input
                name="Cantidad"
                type="number"
                min="0"
                value={formData.Cantidad}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="Descripcion"
              value={formData.Descripcion}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Tamaño (ml)</label>
              <select
                name="Tamaño"
                value={formData.Tamaño}
                onChange={handleChange}
              >
                <option value="">Seleccionar...</option>
                <option value="100">100 ml</option>
                <option value="150">150 ml</option>
                <option value="250">250 ml</option>
              </select>
            </div>

            <div className="form-group">
              <label>Calorías</label>
              <input
                name="Calorias"
                type="number"
                min="0"
                value={formData.Calorias}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Disponibilidad</label>
              <select
                name="Disponibilidad"
                value={formData.Disponibilidad}
                onChange={handleChange}
              >
                <option value="1">Disponible</option>
                <option value="0">No disponible</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            {editandoId ? (
              <>
                <button className="btn-guardar" onClick={guardarModificacion}>
                  Guardar Cambios
                </button>
                <button className="btn-cancelar" onClick={cancelarEdicion}>
                  Cancelar
                </button>
              </>
            ) : (
              <button className="btn-agregar" onClick={agregarProducto}>
                Agregar Producto
              </button>
            )}
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="tabla-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Tamaño</th>
                <th>Calorías</th>
                <th>Cantidad</th>
                <th>Disponible</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="8">No hay productos registrados</td>
                </tr>
              ) : (
                productos.map(producto => (
                  <tr key={producto.id}>
                    <td>{producto.Nombre}</td>
                    <td>${producto.Precio}</td>
                    <td>{producto.Descripcion}</td>
                    <td>{producto.Tamaño} ml</td>
                    <td>{producto.Calorias}</td>
                    <td>{producto.Cantidad}</td>
                    <td>{producto.Disponibilidad ? 'Sí' : 'No'}</td>
                    <td>
                      <button 
                        className="btn-editar" 
                        onClick={() => iniciarEdicion(producto)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-eliminar" 
                        onClick={() => eliminarProducto(producto.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventario;