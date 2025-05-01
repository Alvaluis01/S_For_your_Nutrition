import React, { useEffect, useState } from 'react';

function Pedido() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('http://localhost/back_your_nutrition/public/seccionesMenu')
      .then(res => res.json())
      .then(setPedidos)
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pedidos Realizados</h2>
      {pedidos.length === 0 ? (
        <p>No hay pedidos aún.</p>
      ) : (
        <ul>
          {pedidos.map((pedido, idx) => (
            <li key={idx}>
              Producto ID: {pedido.productoId}, Ingrediente ID: {pedido.ingredienteId || 'Ninguno'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Pedido;
