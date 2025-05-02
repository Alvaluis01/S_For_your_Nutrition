import React, { useState } from 'react';
import { Link } from 'react-router-dom';


function Notificaciones() {
  const [nueva, setNueva] = useState({
    rol: 'Preparador de batidos',
    mensaje: '',
    tipo: 'info', // 'info', 'alerta'
    estado: 'preparando', // o 'listo'
  });

  const [notificaciones, setNotificaciones] = useState([
    {
      rol: 'Preparador de batidos',
      mensaje: 'Pedido #123 está preparando...',
      tipo: 'info',
      estado: 'preparando',
    },
    {
      rol: 'Empleado',
      mensaje: 'Nuevo pedido a domicilio recibido',
      tipo: 'alerta',
    },
  ]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNueva((prev) => ({ ...prev, [name]: value }));
  };

  const registrarNotificacion = () => {
    if (nueva.mensaje && nueva.rol) {
      setNotificaciones([...notificaciones, nueva]);
      setNueva({
        rol: 'Preparador de batidos',
        mensaje: '',
        tipo: 'info',
        estado: 'preparando',
      });
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
  <h1>Bienvenido nuevamente Admin🥤</h1>

    <div style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
      <h2>Centro de Notificaciones</h2>

      <div style={{ marginBottom: '20px' }}>
        <select name="rol" value={nueva.rol} onChange={manejarCambio}>
          <option value="Preparador de batidos">Preparador de batidos</option>
          <option value="Empleado">Empleado</option>
        </select>
        <select name="tipo" value={nueva.tipo} onChange={manejarCambio}>
          <option value="info">Información</option>
          <option value="alerta">Alerta</option>
        </select>
        {nueva.rol === 'Preparador de batidos' && (
          <select name="estado" value={nueva.estado} onChange={manejarCambio}>
            <option value="preparando">Preparando</option>
            <option value="listo">Listo</option>
          </select>
        )}
        <input
          type="text"
          name="mensaje"
          placeholder="Mensaje de notificación"
          value={nueva.mensaje}
          onChange={manejarCambio}
          style={{ width: '60%', marginLeft: '10px' }}
        />
        <button onClick={registrarNotificacion}>Registrar</button>
      </div>

      <h3>Notificaciones Actuales</h3>
      <ul>
        {notificaciones.map((n, idx) => (
          <li key={idx} style={{ marginBottom: '10px' }}>
            <strong>{n.rol}</strong> - {n.tipo === 'alerta' ? '🚨' : 'ℹ️'}{' '}
            {n.mensaje} {n.estado ? `(Estado: ${n.estado})` : ''}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Notificaciones;
