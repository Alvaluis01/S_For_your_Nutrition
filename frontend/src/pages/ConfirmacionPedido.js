import React from 'react';
import { Link } from 'react-router-dom';
import '../style/confirmacion.css';

function ConfirmacionPedido() {
  return (
    <div className="confirmacion-container">
      <div className="confirmacion-content">
        <h2>¡Pedido Confirmado!</h2>
        <p>Tu pedido ha sido registrado exitosamente y está siendo preparado.</p>
        <p>Recibirás una notificación cuando esté listo para entrega.</p>
        <Link to="/productos" className="volver-btn">
          Volver a Productos
        </Link>
      </div>
    </div>
  );
}

export default ConfirmacionPedido;