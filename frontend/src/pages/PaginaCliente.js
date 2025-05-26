import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/paginacliente.css';

function PaginaCliente() {
  const [notificacionesCliente, setNotificacionesCliente] = useState([]);

  useEffect(() => {
    const notificacionesGuardadas = JSON.parse(localStorage.getItem('notificaciones')) || [];
    const notificacionesCliente = notificacionesGuardadas.filter(n => n.destinatario === 'cliente');
    setNotificacionesCliente(notificacionesCliente);
  }, []);

  const eliminarTodasNotificaciones = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar todas tus notificaciones?')) {
      const notificacionesGuardadas = JSON.parse(localStorage.getItem('notificaciones')) || [];
      const nuevasNotificaciones = notificacionesGuardadas.filter(n => n.destinatario !== 'cliente');
      localStorage.setItem('notificaciones', JSON.stringify(nuevasNotificaciones));
      setNotificacionesCliente([]);
    }
  };

  const marcarComoLeida = (id) => {
    const notificacionesActualizadas = notificacionesCliente.map(notif => {
      if (notif.id === id) {
        return { ...notif, leida: true };
      }
      return notif;
    });
    
    setNotificacionesCliente(notificacionesActualizadas);
    
    // Actualizar localStorage
    const todasNotificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
    const nuevasNotificaciones = todasNotificaciones.map(notif => {
      if (notif.id === id) {
        return { ...notif, leida: true };
      }
      return notif;
    });
    
    localStorage.setItem('notificaciones', JSON.stringify(nuevasNotificaciones));
  };

  return (
      <div >
        <nav className="menu-cliente">
          <div className="logo">
            <h2>S´ FOR YOUR NUTRITION</h2>
          </div>
          <ul className="menu-links">
            <li><Link to="/comprar">Ordenar</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/micuentacliente">Mi Cuenta</Link></li>
          </ul>
        </nav>

      <div className="contenido-notificaciones-cliente">
        <div className="notificaciones-header">
          <h1 className="titulo-notificaciones">Tus Notificaciones</h1>
          {notificacionesCliente.length > 0 && (
            <button onClick={eliminarTodasNotificaciones} className="btn-eliminar-todas">
              <i className="fas fa-trash-alt"></i> Limpiar todo
            </button>
          )}
        </div>

        {notificacionesCliente.length === 0 ? (
          <div className="sin-notificaciones">
            <i className="far fa-bell-slash"></i>
            <p>No tienes notificaciones nuevas</p>
          </div>
        ) : (
          <ul className="lista-notificaciones">
            {notificacionesCliente.map(notif => (
              <li 
                key={notif.id} 
                className={`notificacion ${notif.tipo} ${notif.leida ? 'leida' : 'no-leida'}`}
                onClick={() => marcarComoLeida(notif.id)}
              >
                <div className="notificacion-header">
                  <div className="notificacion-tipo">
                    <span className={`icono-tipo ${notif.tipo}`}>
                      {notif.tipo === 'info' && <i className="fas fa-info-circle"></i>}
                      {notif.tipo === 'alerta' && <i className="fas fa-exclamation-triangle"></i>}
                      {notif.tipo === 'promocion' && <i className="fas fa-percentage"></i>}
                    </span>
                    <h3>{notif.titulo}</h3>
                  </div>
                  <span className="fecha">
                    {new Date(notif.fecha).toLocaleString()}
                  </span>
                </div>
                <p className="mensaje-notificacion">{notif.mensaje}</p>
                {!notif.leida && <span className="badge-nueva">NUEVO</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PaginaCliente;