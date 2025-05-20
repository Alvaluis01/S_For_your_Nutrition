import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de las notificaciones
const NotificacionesContext = createContext();

// Hook para usar el contexto
export const useNotificaciones = () => {
  return useContext(NotificacionesContext);
};

// Componente proveedor del contexto
export const NotificacionesProvider = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([
    {
      rol: 'Preparador de batidos',
      mensaje: 'Tu pedido #123 está en preparación...',
      tipo: 'info',
      estado: 'preparando',
    },
    {
      rol: 'Sistema',
      mensaje: '¡Tenemos nuevos productos disponibles!',
      tipo: 'promocion',
    },
  ]);

  const registrarNotificacion = (nuevaNotificacion) => {
    setNotificaciones((prevNotificaciones) => [...prevNotificaciones, nuevaNotificacion]);
  };

  return (
    <NotificacionesContext.Provider value={{ notificaciones, registrarNotificacion }}>
      {children}
    </NotificacionesContext.Provider>
  );
};
