import React, { createContext, useContext, useState } from 'react';

// Crear el contexto con valores por defecto
const CarritoContext = createContext({
  carrito: [],
  metodosPago: [],
  agregarAlCarrito: () => {},
  eliminarDelCarrito: () => {},
  actualizarCantidad: () => {},
  vaciarCarrito: () => {},
  calcularTotal: () => 0
});

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const actualizarCantidad = (id, nuevaCantidad, nuevosIngredientes = null) => {
    setCarrito(prev =>
      prev.map(item =>
        item.id === id 
          ? { 
              ...item, 
              cantidad: Math.max(1, nuevaCantidad), // No permite menos de 1
              ...(nuevosIngredientes !== null && { ingredientesAdicionales: nuevosIngredientes })
            } 
          : item
      )
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  return (
    <CarritoContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      actualizarCantidad,
      vaciarCarrito,
      calcularTotal
    }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook personalizado con verificación de contexto
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (context === undefined) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  }
  return context;
};