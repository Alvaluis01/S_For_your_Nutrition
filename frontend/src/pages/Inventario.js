import React, { useState } from 'react';
import '../style/inventario.css';
import { Link } from 'react-router-dom';


const Inventario = () => {
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

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevo((prev) => ({ ...prev, [name]: value }));
  };

  const obtenerFechaActual = () => {
    return new Date().toLocaleString(); // Fecha y hora local legible
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
        
        <input name="idProducto" placeholder="ID Producto" value={nuevo.idProducto} onChange={manejarCambio} />
        <input name="tipo" placeholder="Tipo" value={nuevo.tipo} onChange={manejarCambio} />
        <input name="nombre" placeholder="Nombre" value={nuevo.nombre} onChange={manejarCambio} />
        <input name="proveedor" placeholder="Proveedor" value={nuevo.proveedor} onChange={manejarCambio} />
        <input name="cantidad" type="number" placeholder="Cantidad" value={nuevo.cantidad} onChange={manejarCambio} />
        <input name="unidad" placeholder="Unidad" value={nuevo.unidad} onChange={manejarCambio} />
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
