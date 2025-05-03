
import {useNavigate  } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [cliente, setPersona] = useState(null); // Asegúrate de obtener el cliente en la sesión actual
  const documentoCliente = localStorage.getItem('clienteDocumento');

  useEffect(() => {
    if (!documentoCliente) {
      alert('Por favor, inicia sesión para ver los productos');
      // Redirigir si usas React Router:
      // navigate('/login');
    }
  }, []);
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) setCarrito(carritoGuardado);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);
  
  
  const enviarPedido = () => {
    const pedido = {
      cliente_documento: documentoCliente,
      fecha: new Date().toISOString().split('T')[0], // Formato: YYYY-MM-DD
      estado: 'pendiente',
      tipo_compra: 'domicilio',
      ubicacion: 'direccion de prueba',
      total: carrito.reduce((acc, item) => acc + parseFloat(item.Precio), 0),
      metodo_pago: 'efectivo',
      productos: carrito.map((item) => ({
        producto_id: item.Id,
        ingredientes_adicionales: item.IngredientesAdicionales
      }))
    };
  
    fetch('http://localhost/back_your_nutrition/public/registrar-pedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pedido)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Pedido registrado:', data);
        setCarrito([]); // Limpia el carrito después del envío
        alert('¡Pedido enviado correctamente!');
      })
      .catch(error => {
        console.error('Error al enviar el pedido:', error);
      });
  };
  
  const handleCheckout = async () => {
    if (cliente) {
      const response = await fetch('http://localhost/back_your_nutrition/public/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Id_cliente: cliente.Id,
          // Aquí va más información sobre el pedido (estado, fecha, etc.)
        })
      });
      
      if (response.ok) {
        alert('Pedido realizado correctamente');
      } else {
        alert('Error al realizar el pedido');
      }
    } else {
      alert('Debes estar logueado para realizar un pedido');
    }
  };

  return (
    <div>
      {carrito.length > 0 && (
  <button onClick={enviarPedido} style={{ marginTop: '20px' }}>
    Confirmar pedido
  </button>
)}

    </div>
  );
}

export default Carrito;
