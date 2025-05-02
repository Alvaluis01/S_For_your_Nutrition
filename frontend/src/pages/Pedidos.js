import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegistrarPedido() {
  const [pedido, setPedido] = useState({
    cliente: '',
    producto: '',
    ingredientes: '',
    fecha: new Date().toISOString().split('T')[0], // Fecha actual
    total: '',
  });

  const [pedidos, setPedidos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedido((prev) => ({ ...prev, [name]: value }));
  };

  const registrar = () => {
    if (pedido.cliente && pedido.producto && pedido.total) {
      setPedidos([...pedidos, { ...pedido }]);
      setPedido({
        cliente: '',
        producto: '',
        ingredientes: '',
        fecha: new Date().toISOString().split('T')[0],
        total: '',
      });
    } else {
      alert('Por favor completa al menos Cliente, Producto y Total.');
    }
  };

  return (
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
          </ul>
        </div>
      </nav>
   
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Registrar Pedido</h2>
      <input
        type="text"
        name="cliente"
        placeholder="Cliente"
        value={pedido.cliente}
        onChange={handleChange}
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <input
        type="text"
        name="producto"
        placeholder="Producto"
        value={pedido.producto}
        onChange={handleChange}
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <input
        type="text"
        name="ingredientes"
        placeholder="Ingredientes"
        value={pedido.ingredientes}
        onChange={handleChange}
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <input
        type="date"
        name="fecha"
        value={pedido.fecha}
        onChange={handleChange}
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <input
        type="number"
        name="total"
        placeholder="Total"
        value={pedido.total}
        onChange={handleChange}
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <button onClick={registrar}>Registrar Pedido</button>

      <h3 style={{ marginTop: '30px' }}>Pedidos Registrados</h3>
      <ul>
        {pedidos.map((p, index) => (
          <li key={index}>
            <strong>{p.cliente}</strong> pidió <strong>{p.producto}</strong> con <em>{p.ingredientes || 'sin ingredientes extra'}</em> el <strong>{p.fecha}</strong>. Total: ${p.total}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default RegistrarPedido;
