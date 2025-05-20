import React, { useState, useEffect } from 'react';
import '../style/inventario.css';
import { Link } from 'react-router-dom';

const Inventario = () => {
  const [items, setItems] = useState([]);
  const [nuevo, setNuevo] = useState({
    Nombre: '',
    Precio: '',
    Disponibilidad: 1,
    Id_ingrediente: '',
    Id_cantidad_ingrediente: '',
    Descripcion: '',
    Tamaño: '',
    Calorias: ''
  });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarProductos();
    obtenerUltimoId();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await fetch('http://localhost:8000/productos');
      if (!res.ok) throw new Error('Error al cargar productos');
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error('Error al cargar productos', err);
    }
  };

  const obtenerUltimoId = async () => {
    try {
      const res = await fetch('http://localhost:8000/productos');
      if (!res.ok) throw new Error('Error al obtener últimos IDs');
      const data = await res.json();
      
      if (data.length > 0) {
        const lastItem = data[data.length - 1];
        setNuevo(prev => ({
          ...prev,
          Id_ingrediente: (parseInt(lastItem.Id_ingrediente) + 1).toString(),
          Id_cantidad_ingrediente: (parseInt(lastItem.Id_cantidad_ingrediente) + 1).toString()
        }));
      } else {
        setNuevo(prev => ({
          ...prev,
          Id_ingrediente: '1',
          Id_cantidad_ingrediente: '1'
        }));
      }
    } catch (error) {
      console.error('Error al obtener últimos IDs', error);
    }
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevo((prev) => ({ ...prev, [name]: value }));
  };

  const agregar = async () => {
    if (
      !nuevo.Nombre || !nuevo.Precio || !nuevo.Id_ingrediente ||
      !nuevo.Id_cantidad_ingrediente || !nuevo.Descripcion ||
      !nuevo.Tamaño || !nuevo.Calorias
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const res = await fetch('http://localhost:8000/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevo)
      });

      if (!res.ok) throw new Error('Error al agregar producto');

      const nuevoProducto = await res.json();
      setItems([...items, nuevoProducto]);

      setNuevo(prev => ({
        Nombre: '',
        Precio: '',
        Disponibilidad: 1,
        Id_ingrediente: (parseInt(prev.Id_ingrediente) + 1).toString(),
        Id_cantidad_ingrediente: (parseInt(prev.Id_cantidad_ingrediente) + 1).toString(),
        Descripcion: '',
        Tamaño: '',
        Calorias: ''
      }));
    } catch (error) {
      console.error('Error al agregar producto', error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      const res = await fetch(`http://localhost:8000/productos/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Error al eliminar producto');

      setItems(items.filter(item => item.id !== id));
      
      // Si estábamos editando el producto eliminado, cancelamos la edición
      if (editando && editando.id === id) {
        setEditando(null);
        setNuevo({
          Nombre: '',
          Precio: '',
          Disponibilidad: 1,
          Id_ingrediente: '',
          Id_cantidad_ingrediente: '',
          Descripcion: '',
          Tamaño: '',
          Calorias: ''
        });
      }
    } catch (error) {
      console.error('Error al eliminar producto', error);
    }
  };

  const iniciarEdicion = (producto) => {
    setEditando(producto);
    setNuevo({
      Nombre: producto.Nombre,
      Precio: producto.Precio,
      Disponibilidad: producto.Disponibilidad,
      Id_ingrediente: producto.Id_ingrediente,
      Id_cantidad_ingrediente: producto.Id_cantidad_ingrediente,
      Descripcion: producto.Descripcion,
      Tamaño: producto.Tamaño,
      Calorias: producto.Calorias
    });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setNuevo({
      Nombre: '',
      Precio: '',
      Disponibilidad: 1,
      Id_ingrediente: '',
      Id_cantidad_ingrediente: '',
      Descripcion: '',
      Tamaño: '',
      Calorias: ''
    });
  };

  const actualizarProducto = async () => {
    if (
      !nuevo.Nombre || !nuevo.Precio || !nuevo.Id_ingrediente ||
      !nuevo.Id_cantidad_ingrediente || !nuevo.Descripcion ||
      !nuevo.Tamaño || !nuevo.Calorias
    ) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/productos/${editando.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevo)
      });

      if (!res.ok) throw new Error('Error al actualizar producto');

      const productoActualizado = await res.json();
      setItems(items.map(item => item.id === editando.id ? productoActualizado : item));
      
      setEditando(null);
      setNuevo({
        Nombre: '',
        Precio: '',
        Disponibilidad: 1,
        Id_ingrediente: '',
        Id_cantidad_ingrediente: '',
        Descripcion: '',
        Tamaño: '',
        Calorias: ''
      });
    } catch (error) {
      console.error('Error al actualizar producto', error);
    }
  };

  return (
    <div>
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

        <div className="formulario">
          <select 
            name="Nombre" 
            value={nuevo.Nombre} 
            onChange={manejarCambio}
            className={!nuevo.Nombre ? 'placeholder-selected' : ''}
          >
            <option value="" disabled hidden>Seleccione un producto</option>
            <option value="Cupcake de vainilla">Cupcake de vainilla</option>
            <option value="Cupcake de Avena">Cupcake de Avena</option>
            <option value="Malteada">Malteada</option>
          </select>

          <input name="Precio" type="number" placeholder="Precio" value={nuevo.Precio} onChange={manejarCambio} />
          
          <input name="Id_ingrediente" placeholder="ID Ingrediente" value={nuevo.Id_ingrediente} onChange={manejarCambio} readOnly />
          <input name="Id_cantidad_ingrediente" placeholder="ID Cantidad" value={nuevo.Id_cantidad_ingrediente} onChange={manejarCambio} readOnly />
          
          <input name="Descripcion" placeholder="Descripción" value={nuevo.Descripcion} onChange={manejarCambio} />
          
          <select 
            name="Tamaño" 
            value={nuevo.Tamaño} 
            onChange={manejarCambio}
            className={!nuevo.Tamaño ? 'placeholder-selected' : ''}
          >
            <option value="" disabled hidden>Seleccione un tamaño</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="250">250</option>
          </select>
          
          <input name="Calorias" placeholder="Calorías" value={nuevo.Calorias} onChange={manejarCambio} />
          
          <select name="Disponibilidad" value={nuevo.Disponibilidad} onChange={manejarCambio}>
            <option value="1">Disponible (1)</option>
            <option value="0">No disponible (0)</option>
          </select>
          
          {editando ? (
            <div className="acciones-edicion">
              <button onClick={actualizarProducto}>Guardar</button>
              <button onClick={cancelarEdicion} className="cancelar">Cancelar</button>
            </div>
          ) : (
            <button onClick={agregar}>Agregar</button>
          )}
        </div>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>ID Ingrediente</th>
              <th>ID Cantidad Ingrediente</th>
              <th>Tamaño (onza)</th>
              <th>Calorías (g)</th>
              <th>Disponibilidad</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan="9">No hay productos registrados</td></tr>
            ) : (
              items.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{item.Nombre}</td>
                  <td>{item.Precio}</td>
                  <td>{item.Descripcion}</td>
                  <td>{item.Id_ingrediente}</td>
                  <td>{item.Id_cantidad_ingrediente}</td>
                  <td>{item.Tamaño}</td>
                  <td>{item.Calorias}</td>
                  <td>{item.Disponibilidad === 1 ? 'Disponible' : 'No disponible'}</td>
                  <td className="acciones">
                    <button onClick={() => iniciarEdicion(item)} className="editar">Editar</button>
                    <button onClick={() => eliminarProducto(item.id)} className="eliminar">Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventario;