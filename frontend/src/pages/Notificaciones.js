import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/notificaciones.css';

function Notificaciones() {
  const [nuevaNotificacion, setNuevaNotificacion] = useState({
    id: Date.now(),
    titulo: '',
    mensaje: '',
    tipo: 'info',
    fecha: new Date().toISOString(),
    leida: false,
    destinatario: 'cliente' // Las notificaciones creadas son para clientes
  });

  const [notificaciones, setNotificaciones] = useState([]);
  const [filtro, setFiltro] = useState('todas');

  // Cargar las notificaciones al iniciar
  useEffect(() => {
    const cargarNotificaciones = () => {
      const notificacionesGuardadas = JSON.parse(localStorage.getItem('notificaciones')) || [];
      // Mostrar TODAS las notificaciones creadas (tanto para admin como cliente)
      setNotificaciones(notificacionesGuardadas);
    };

    cargarNotificaciones();

    // Crear notificación de bienvenida si no existe
    const notificacionesGuardadas = JSON.parse(localStorage.getItem('notificaciones')) || [];
    const existeBienvenida = notificacionesGuardadas.some(
      n => n.titulo && n.titulo.includes('Bienvenido') && n.destinatario === 'cliente'
    );

    if (!existeBienvenida) {
      const notificacionBienvenida = {
        id: Date.now(),
        titulo: 'Bienvenido a S´ FOR YOUR NUTRITION',
        mensaje: '¿Listo para ordenar?',
        tipo: 'info',
        fecha: new Date().toISOString(),
        leida: false,
        destinatario: 'cliente'
      };

      const nuevasNotificaciones = [...notificacionesGuardadas, notificacionBienvenida];
      localStorage.setItem('notificaciones', JSON.stringify(nuevasNotificaciones));
      setNotificaciones(nuevasNotificaciones);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaNotificacion(prev => ({
      ...prev,
      [name]: value,
      id: Date.now(),
      fecha: new Date().toISOString()
    }));
  };

  const crearNotificacion = () => {
    if (!nuevaNotificacion.titulo.trim() || !nuevaNotificacion.mensaje.trim()) {
      alert('Por favor completa el título y el mensaje');
      return;
    }

    const notificacionesGuardadas = JSON.parse(localStorage.getItem('notificaciones')) || [];
    const nuevasNotificaciones = [...notificacionesGuardadas, nuevaNotificacion];

    localStorage.setItem('notificaciones', JSON.stringify(nuevasNotificaciones));
    setNotificaciones(nuevasNotificaciones); // Actualizar el estado con TODAS las notificaciones

    // Resetear el formulario
    setNuevaNotificacion({
      id: Date.now(),
      titulo: '',
      mensaje: '',
      tipo: 'info',
      fecha: new Date().toISOString(),
      leida: false,
      destinatario: 'cliente'
    });

    alert('Notificación creada y enviada al cliente');
  };

  const eliminarNotificacion = (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta notificación?')) {
      return;
    }

    const notificacionesGuardadas = JSON.parse(localStorage.getItem('notificaciones')) || [];
    const nuevasNotificaciones = notificacionesGuardadas.filter(n => n.id !== id);

    localStorage.setItem('notificaciones', JSON.stringify(nuevasNotificaciones));
    setNotificaciones(nuevasNotificaciones);
  };

  // Filtrar notificaciones según el tipo seleccionado
  const notificacionesFiltradas = filtro === 'todas' 
    ? notificaciones 
    : notificaciones.filter(n => n.tipo === filtro);

  return (
    <div className="notificaciones-admin">
      <nav className="menu-admin">
        <div className="contenido-admin">
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

      <div className="contenido-notificaciones">
        <h1>Panel de Notificaciones</h1>
        
        {/* Formulario para crear una nueva notificación */}
        <div className="crear-notificacion">
          <h2>Crear Nueva Notificación para Cliente</h2>
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              name="titulo"
              value={nuevaNotificacion.titulo}
              onChange={handleChange}
              placeholder="Título de la notificación"
              required
            />
          </div>
          <div className="form-group">
            <label>Mensaje:</label>
            <textarea
              name="mensaje"
              value={nuevaNotificacion.mensaje}
              onChange={handleChange}
              placeholder="Escribe el mensaje para el cliente..."
              rows="4"
              required
            />
          </div>
          <div className="form-group">
            <label>Tipo:</label>
            <select
              name="tipo"
              value={nuevaNotificacion.tipo}
              onChange={handleChange}
            >
              <option value="info">Información</option>
              <option value="alerta">Alerta</option>
              <option value="promocion">Promoción</option>
            </select>
          </div>
          <button onClick={crearNotificacion} className="btn-enviar">
            Enviar Notificación
          </button>
        </div>

        {/* Lista de notificaciones enviadas */}
        <div className="lista-notificaciones">
          <div className="filtros-notificaciones">
            <h2>Historial de Notificaciones</h2>
            <div className="filtros">
              <span>Filtrar por tipo: </span>
              <select 
                value={filtro} 
                onChange={(e) => setFiltro(e.target.value)}
                className="select-filtro"
              >
                <option value="todas">Todas</option>
                <option value="info">Información</option>
                <option value="alerta">Alertas</option>
                <option value="promocion">Promociones</option>
              </select>
            </div>
          </div>
          
          {notificacionesFiltradas.length === 0 ? (
            <p className="sin-notificaciones">No hay notificaciones {filtro !== 'todas' ? `de tipo ${filtro}` : ''}</p>
          ) : (
            <ul className="lista-notificaciones-container">
              {notificacionesFiltradas.map(notif => (
                <li key={notif.id} className={`notificacion ${notif.tipo}`}>
                  <div className="notificacion-header">
                    <div>
                      <h3>{notif.titulo}</h3>
                      <div className="notificacion-meta">
                        <span className={`badge-tipo ${notif.tipo}`}>
                          {notif.tipo === 'info' ? 'Información' : 
                           notif.tipo === 'alerta' ? 'Alerta' : 'Promoción'}
                        </span>
                        <span className="badge-destinatario">
                          {notif.destinatario === 'cliente' ? 'Para cliente' : 'Para admin'}
                        </span>
                      </div>
                    </div>
                    <span className="fecha">{new Date(notif.fecha).toLocaleString()}</span>
                  </div>
                  <p className="mensaje-notificacion">{notif.mensaje}</p>
                  <div className="notificacion-acciones">
                    <button 
                      onClick={() => eliminarNotificacion(notif.id)}
                      className="btn-eliminar"
                      title="Eliminar notificación"
                    >
                      <i className="fas fa-trash"></i> Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notificaciones;