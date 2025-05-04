// src/pages/Carrito.js o src/components/Carrito.js (como prefieras organizarlo)
import React from 'react';
import { useCarrito } from '../context/CarritoContext';

function Carrito() {
  const { carrito, vaciarCarrito } = useCarrito();
  const documentoCliente = localStorage.getItem('clienteDocumento');

  // Calcula el total del pedido
  const total = carrito.reduce((acc, item) => acc + parseFloat(item.Precio), 0);

  const enviarPedido = () => {
    const pedido = {
      Id_cliente: documentoCliente,
      Fecha: new Date().toISOString().split('T')[0],
      Estado: 'pendiente',
      Id_ingrediente: carrito.flatMap(item => item.IngredientesAdicionales),
      Id_tipo_compra: '1',
      Ubicacion_entrega: 'Dirección del cliente',
      Total: total,
      Id_Metodo_pago: '1',
    };

    fetch('http://localhost/back_your_nutrition/public/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pedido)
    })
      .then(response => response.json())
      .then(data => {
        alert('Pedido realizado con éxito');
        vaciarCarrito(); // Limpiar carrito tras enviar pedido
      })
      .catch(error => {
        console.error('Error al realizar el pedido:', error);
        alert('Error al realizar el pedido.');
      });
  };

  return (
    <div>
      <h2>Carrito de compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {carrito.map((item, index) => (
            <li key={index}>
              {item.Nombre} - ${item.Precio}
              {item.IngredientesAdicionales && item.IngredientesAdicionales.length > 0 && (
                <p>
                  <strong>Ingredientes:</strong> {item.IngredientesAdicionales.join(', ')}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
      {carrito.length > 0 && (
        <button onClick={enviarPedido} style={{ marginTop: '20px' }}>
          Hacer Pedido
        </button>
      )}
    </div>
  );
}

export default Carrito;
