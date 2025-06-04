import React, { useState } from 'react';
import '../style/inventario.css';
import { Link } from 'react-router-dom';

const Inventario = () => {
  // Base de datos de productos predefinidos con unidades sugeridas
  const productosDisponibles = [
    { idProducto: 'A001', tipo: 'Fruta', nombre: 'Fresa', unidadSugerida: 'kg' },
    { idProducto: 'A002', tipo: 'Fruta', nombre: 'Banano', unidadSugerida: 'kg' },
    { idProducto: 'B001', tipo: 'Verdura', nombre: 'Zanahoria', unidadSugerida: 'kg' },
    { idProducto: 'B002', tipo: 'Verdura', nombre: 'Brócoli', unidadSugerida: 'kg' },
    { idProducto: 'C001', tipo: 'Lácteo', nombre: 'Leche', unidadSugerida: 'L' },
    { idProducto: 'C002', tipo: 'Lácteo', nombre: 'Queso', unidadSugerida: 'kg' },
    { idProducto: 'D001', tipo: 'Bebida', nombre: 'Jugo', unidadSugerida: 'ml' },
    { idProducto: 'E001', tipo: 'Especia', nombre: 'Sal', unidadSugerida: 'gr' },
  ];

  // Unidades de medida disponibles por tipo de producto
  const unidadesPorTipo = {
    Fruta: ['kg', 'gr', 'unidad'],
    Verdura: ['kg', 'gr', 'unidad'],
    Lácteo: ['L', 'ml', 'kg', 'unidad'],
    Bebida: ['L', 'ml', 'unidad'],
    Especia: ['gr', 'kg'],
    // Puedes agregar más tipos y sus unidades correspondientes
  };

  const [items, setItems] = useState([
    {
      id: 1,
      idProducto: 'A001',
      tipo: 'Fruta',
      nombre: 'Fresa',
      proveedor: 'Frutas S.A.',
      cantidad: 20,
      unidad: 'kg',
      fechaModificacion: new Date().toLocaleString(),
    },
    {
      id: 2,
      idProducto: 'A002',
      tipo: 'Fruta',
      nombre: 'Banano',
      proveedor: 'Campo Verde',
      cantidad: 15,
      unidad: 'kg',
      fechaModificacion: new Date().toLocaleString(),
    },
  ]);

  const [nuevo, setNuevo] = useState({
    idProducto: '',
    tipo: '',
    nombre: '',
    proveedor: '',
    cantidad: '',
    unidad: '',
  });

  const [editando, setEditando] = useState(null);

  // Manejar cambio en el combo box de productos
  const manejarSeleccionProducto = (e) => {
    const idSeleccionado = e.target.value;
    const productoSeleccionado = productosDisponibles.find(
      (prod) => prod.idProducto === idSeleccionado
    );
    
    if (productoSeleccionado) {
      setNuevo({
        ...nuevo,
        idProducto: productoSeleccionado.idProducto,
        tipo: productoSeleccionado.tipo,
        nombre: productoSeleccionado.nombre,
        unidad: productoSeleccionado.unidadSugerida // Establecer unidad sugerida por defecto
      });
    }
  };

  // Manejar cambios en los otros campos
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevo((prev) => ({ ...prev, [name]: value }));
  };

  const obtenerFechaActual = () => {
    return new Date().toLocaleString();
  };

  const agregar = () => {
    if (
      nuevo.idProducto &&
      nuevo.tipo &&
      nuevo.nombre &&
      nuevo.proveedor &&
      nuevo.cantidad &&
      nuevo.unidad
    ) {
      const nuevoItem = {
        id: Date.now(),
        ...nuevo,
        cantidad: parseInt(nuevo.cantidad),
        fechaModificacion: obtenerFechaActual(),
      };
      setItems([...items, nuevoItem]);
      setNuevo({
        idProducto: '',
        tipo: '',
        nombre: '',
        proveedor: '',
        cantidad: '',
        unidad: '',
      });
    }
  };

  const eliminar = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const editar = (item) => {
    setEditando(item);
    setNuevo({
      idProducto: item.idProducto,
      tipo: item.tipo,
      nombre: item.nombre,
      proveedor: item.proveedor,
      cantidad: item.cantidad,
      unidad: item.unidad,
    });
  };

  const guardar = () => {
    setItems(
      items.map((item) =>
        item.id === editando.id
          ? {
              ...editando,
              ...nuevo,
              cantidad: parseInt(nuevo.cantidad),
              fechaModificacion: obtenerFechaActual(),
            }
          : item
      )
    );
    setEditando(null);
    setNuevo({
      idProducto: '',
      tipo: '',
      nombre: '',
      proveedor: '',
      cantidad: '',
      unidad: '',
    });
  };

  // Obtener unidades disponibles según el tipo de producto seleccionado
  const obtenerUnidadesDisponibles = () => {
    if (!nuevo.tipo) return ['kg', 'gr', 'L', 'ml', 'unidad']; // Unidades por defecto si no hay tipo
    return unidadesPorTipo[nuevo.tipo] || ['kg', 'gr', 'L', 'ml', 'unidad'];
  };

  return (
    <div>
      <div>
        
              <nav className="menu-cliente">
                <div className="contenido-cliente">
                  <div className="logo">
                    <h2>S´ FOR YOUR NUTRITION</h2>
                  </div>
                  <ul className="menu-links">
                    <li><Link to="/pedidos">Pedidos</Link></li>
                    <li><Link to="/notificaciones">Notificaciones</Link></li>
                    <li><Link to="/inventario">Inventario</Link></li>
                    <li><Link to="/micuentaadmin">Mi Cuenta</Link></li>
                  </ul>
                </div>
              </nav>
        <h1>Bienvenido nuevamente Admin🥤</h1>
      </div>

      <div className="inventario">
        <h2>Inventario</h2>
        <div className="formulario">
          {/* Combo box para seleccionar producto */}
          <select 
            name="idProducto" 
            value={nuevo.idProducto} 
            onChange={manejarSeleccionProducto}
            required
          >
            <option value="">Seleccione un producto</option>
            {productosDisponibles.map((producto) => (
              <option key={producto.idProducto} value={producto.idProducto}>
                {producto.idProducto} - {producto.nombre} ({producto.tipo})
              </option>
            ))}
          </select>
          
          {/* Campos que se autocompletan al seleccionar un producto */}
          <input name="tipo" placeholder="Tipo" value={nuevo.tipo} readOnly />
          <input name="nombre" placeholder="Nombre" value={nuevo.nombre} readOnly />
          
          {/* Campo de proveedor */}
          <input name="proveedor" placeholder="Proveedor" value={nuevo.proveedor} onChange={manejarCambio} required />
          
          {/* Campo de cantidad */}
          <input 
            name="cantidad" 
            type="number" 
            placeholder="Cantidad" 
            value={nuevo.cantidad} 
            onChange={manejarCambio} 
            min="0"
            step="0.01"
            required
          />
          
          {/* Combo box para unidades de medida */}
          <select
            name="unidad"
            value={nuevo.unidad}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione unidad</option>
            {obtenerUnidadesDisponibles().map((unidad) => (
              <option key={unidad} value={unidad}>
                {unidad}
              </option>
            ))}
          </select>
          
          {editando ? (
            <button onClick={guardar}>Guardar</button>
          ) : (
            <button onClick={agregar}>Agregar</button>
          )}
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Proveedor</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Modificado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.idProducto}</td>
                <td>{item.tipo}</td>
                <td>{item.nombre}</td>
                <td>{item.proveedor}</td>
                <td className={item.cantidad <= 5 ? 'bajo-stock' : ''}>{item.cantidad}</td>
                <td>{item.unidad}</td>
                <td>{item.fechaModificacion}</td>
                <td>
                  <button onClick={() => editar(item)}>Editar</button>
                  <button onClick={() => eliminar(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventario;