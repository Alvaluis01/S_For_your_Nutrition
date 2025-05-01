import React, { useState } from 'react';


function App() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (item) => setCarrito([...carrito, item]);

  const enviarPedido = async () => {
    const pedido = {
      Id_cliente: 1,
      Fecha: new Date().toISOString().split('T')[0],
      Estado: 'Pendiente',
      Id_tipo_compra: 1,
      Ubicacion_entrega: 'Calle Falsa 123',
      Total: 9999,
      Id_Metodo_pago: 1,
      carrito
    };

    const res = await fetch('http://localhost:8000/api/pedido', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });
    const data = await res.json();
    console.log(data);
    setCarrito([]);
  };

  return (
    <div>
      <h1>Sistema de Pedidos</h1>
      <productoForm agregarAlCarrito={agregarAlCarrito} />
      <carrito carrito={carrito} />
      <button onClick={enviarPedido}>Enviar Pedido</button>
    </div>
  );
}

export default App;



// import React, { useEffect, useState } from 'react';
// import '../style/modal.css'; // Asegúrate de crear este archivo para estilos del modal

// function ProductosConExtras() {
//   const [productos, setProductos] = useState([]);
//   const [ingredientes, setIngredientes] = useState([]);
//   const [orden, setOrden] = useState([]);
//   const [productoSeleccionado, setProductoSeleccionado] = useState(null);
//   const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState(null);
//   const [mostrarModal, setMostrarModal] = useState(false);

//   useEffect(() => {
//     fetch('http://localhost/back_your_nutrition/public/productos')
//       .then(res => res.json())
//       .then(setProductos);

//     fetch('http://localhost/back_your_nutrition/public/ingredientes')
//       .then(res => res.json())
//       .then(setIngredientes);
//   }, []);

//   const abrirModal = (producto) => {
//     setProductoSeleccionado(producto);
//     setIngredienteSeleccionado(null);
//     setMostrarModal(true);
//   };

//   const agregarProductoAOrden = () => {
//     setOrden([...orden, { 
//       productoId: productoSeleccionado.Id, 
//       ingredienteId: ingredienteSeleccionado || null 
//     }]);
//     setMostrarModal(false);
//   };

//   const enviarOrden = () => {
//     fetch('http://localhost/back_your_nutrition/public/seccionesMenu', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ productos: orden })
//     })
//       .then(res => res.json())
//       .then(() => {
//         alert('Orden registrada exitosamente');
//         setOrden([]);
//       })
//       .catch(err => console.error(err));
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Selecciona tus productos</h2>
//       {productos.map((prod) => (
//         <div key={prod.Id} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
//           <h3>{prod.Nombre}</h3>
//           <p>{prod.Descripcion}</p>
//           <p>Precio: ${prod.Precio}</p>
//           <button onClick={() => abrirModal(prod)}>Seleccionar</button>
//         </div>
//       ))}

//       <h4>Carrito:</h4>
//       <ul>
//         {orden.map((item, idx) => (
//           <li key={idx}>Producto #{item.productoId} {item.ingredienteId && `(Ingrediente adicional: ${item.ingredienteId})`}</li>
//         ))}
//       </ul>

//       <button onClick={enviarOrden} style={{ marginTop: '20px' }}>Enviar Orden</button>

//       {mostrarModal && (
//         <div className="modal-backdrop">
//           <div className="modal-content">
//             <h3>{productoSeleccionado?.Nombre}</h3>
//             <p>¿Deseas añadir un ingrediente adicional?</p>

//             <select onChange={(e) => setIngredienteSeleccionado(e.target.value)}>
//               <option value="">Sin adicional</option>
//               {ingredientes.map((ing) => (
//                 <option key={ing.Id} value={ing.Id}>{ing.Nombre}</option>
//               ))}
//             </select>

//             <div style={{ marginTop: '15px' }}>
//               <button onClick={agregarProductoAOrden}>Añadir al carrito</button>
//               <button onClick={() => setMostrarModal(false)} style={{ marginLeft: '10px' }}>Cancelar</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProductosConExtras;

 