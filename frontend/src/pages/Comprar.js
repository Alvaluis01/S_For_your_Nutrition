import React, { useState, useEffect } from 'react';
import '../style/register.css'; // Asegúrate de que este archivo exista

function Pedido() {


    const [pedido, setPedido] = useState({
        id_cliente: '',
        id_ingrediente: '',
        id_tipo_compra: '',
        ubicacion_entrega: '',
        id_metodo_pago: '',
        total: 0,
      });
      
  

  const [ingredientes, setIngredientes] = useState([]);
  const [tiposCompra, setTiposCompra] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);

  useEffect(() => {
    // Obtener ingredientes desde la API



    fetch('http://localhost/back_s_for_you_nutrition/public/ingredientes')
      .then((response) => response.json())
      .then((data) => {
        console.log('Ingredientes:', data);
        setIngredientes(data);
      })
      .catch((error) => {
        console.error('Error al obtener los ingredientes:', error);
      });

    // Obtener tipos de compra desde la API
    fetch('http://localhost/back_s_for_you_nutrition/public/tiposcompra')
      .then((response) => response.json())
      .then((data) => {
        console.log('Tipos de compra:', data);
        setTiposCompra(data);
      })
      .catch((error) => {
        console.error('Error al obtener los tipos de compra:', error);
      });

    // Obtener métodos de pago desde la API
    fetch('http://localhost/back_s_for_you_nutrition/public/metodospago')
      .then((response) => response.json())
      .then((data) => {
        console.log('Métodos de pago:', data);
        setMetodosPago(data);
      })
      .catch((error) => {
        console.error('Error al obtener los métodos de pago:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedido((prevState) => {
      const updatedPedido = { ...prevState, [name]: value };

      // Calcular el total basado en el ingrediente seleccionado
      if (name === 'id_ingrediente') {
        const ingredienteSeleccionado = ingredientes.find(
          (ingrediente) => ingrediente.id === parseInt(value)
        );
        if (ingredienteSeleccionado) {
          updatedPedido.total = ingredienteSeleccionado.precio || 0;
        }
      }

      return updatedPedido;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost/back_s_for_you_nutrition/public/pedidos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedido),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Pedido realizado con éxito:', data);
      })
      .catch((error) => {
        console.error('Error al realizar el pedido:', error);
      });
  };

  return (
    <div className="auth-container">
      <div className="logo-section">
        <h1>Realizar Pedido</h1>
        <p>Complete los detalles del pedido a continuación.</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {/* Cliente */}
        <div>
          <label>Cliente:</label>
          <input
            type="number"
            name="id_cliente"
            value={pedido.id_cliente}
            onChange={handleChange}
            required
          />
        </div>

        {/* Ingrediente */}
        <div>
          <label>Ingrediente:</label>
          <select
            name="id_ingrediente"
            value={pedido.id_ingrediente}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un ingrediente</option>
            {ingredientes.length > 0 ? (
              ingredientes.map((ingrediente) => (
                <option key={ingrediente.id} value={ingrediente.id}>
                  {ingrediente.nombre}
                </option>
              ))
            ) : (
              <option disabled>Cargando ingredientes...</option>
            )}
          </select>
        </div>

        {/* Tipo de compra */}
        <div>
          <label>Tipo de compra:</label>
          <select
            name="id_tipo_compra"
            value={pedido.id_tipo_compra}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo de compra</option>
            {tiposCompra.length > 0 ? (
              tiposCompra.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))
            ) : (
              <option disabled>Cargando tipos de compra...</option>
            )}
          </select>
        </div>

        {/* Ubicación de entrega */}
        {pedido.id_tipo_compra === '2' && (
          <div>
            <label>Ubicación de entrega:</label>
            <input
              type="text"
              name="ubicacion_entrega"
              value={pedido.ubicacion_entrega}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Método de pago */}
        <div>
          <label>Método de pago:</label>
          <select
            name="id_metodo_pago"
            value={pedido.id_metodo_pago}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un método de pago</option>
            {metodosPago.length > 0 ? (
              metodosPago.map((metodo) => (
                <option key={metodo.id} value={metodo.id}>
                  {metodo.nombre}
                </option>
              ))
            ) : (
              <option disabled>Cargando métodos de pago...</option>
            )}
          </select>
        </div>

        {/* Total */}
        <div>
          <label>Total:</label>
          <input
            type="number"
            name="total"
            value={pedido.total}
            onChange={handleChange}
            disabled
          />
        </div>

        {/* Resumen del pedido */}
        <div>
          <h3>Resumen de tu pedido</h3>
          <p><strong>Ingrediente:</strong> {ingredientes.find(ingrediente => ingrediente.id === parseInt(pedido.id_ingrediente))?.nombre || 'N/A'}</p>
          <p><strong>Tipo de Compra:</strong> {tiposCompra.find(tipo => tipo.id === parseInt(pedido.id_tipo_compra))?.nombre || 'N/A'}</p>
          <p><strong>Método de Pago:</strong> {metodosPago.find(metodo => metodo.id === parseInt(pedido.id_metodo_pago))?.nombre || 'N/A'}</p>
          <p><strong>Total:</strong> ${pedido.total}</p>
        </div>

        {/* Botón de enviar */}
        <button type="submit" className="btn-primary">Realizar Pedido</button>
      </form>
    </div>
  );
}

export default Pedido;


/*
import React, { useState, useEffect } from 'react';
import '../style/register.css';  // Asegúrate de tener este archivo CSS

function Pedido() {
  const [ingredientes, setIngredientes] = useState([]);
  const [tiposCompra, setTiposCompra] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);

  // Realizamos las peticiones a las API para obtener los datos
  useEffect(() => {
    // Obtener ingredientes desde la API
    fetch('/api/ingredientes')
      .then((response) => response.json())
      .then((data) => setIngredientes(data))
      .catch((error) => {
        console.error('Error al obtener los ingredientes:', error);
      });

    // Obtener tipos de compra desde la API
    fetch('/api/tiposCompra')
      .then((response) => response.json())
      .then((data) => setTiposCompra(data))
      .catch((error) => {
        console.error('Error al obtener los tipos de compra:', error);
      });

    // Obtener métodos de pago desde la API
    fetch('/api/metodosPago')
      .then((response) => response.json())
      .then((data) => setMetodosPago(data))
      .catch((error) => {
        console.error('Error al obtener los métodos de pago:', error);
      });
  }, []);

  return (
    <div className="auth-container">
      <div className="logo-section">
        <h1>Lista de Ingredientes, Tipos de Compra y Métodos de Pago</h1>
        <p>A continuación se muestran los ingredientes, tipos de compra y métodos de pago disponibles.</p>
      </div>

      <div className="ingredientes-list">
        <h2>Ingredientes:</h2>
        {ingredientes.length === 0 ? (
          <p>No hay ingredientes disponibles.</p>
        ) : (
          <ul>
            {ingredientes.map((ingrediente) => (
              <li key={ingrediente.id}>{ingrediente.nombre}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="tipos-compra-list">
        <h2>Tipos de Compra:</h2>
        {tiposCompra.length === 0 ? (
          <p>No hay tipos de compra disponibles.</p>
        ) : (
          <ul>
            {tiposCompra.map((tipo) => (
              <li key={tipo.id}>{tipo.nombre}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="metodos-pago-list">
        <h2>Métodos de Pago:</h2>
        {metodosPago.length === 0 ? (
          <p>No hay métodos de pago disponibles.</p>
        ) : (
          <ul>
            {metodosPago.map((metodo) => (
              <li key={metodo.id}>{metodo.nombre}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Pedido;

*/ 