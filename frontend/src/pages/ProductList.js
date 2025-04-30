import React, { useEffect, useState } from 'react';
import '../style/styles.css';
import '../style/products.css';

// Importa las imágenes
import cupavena from '../image/cupave.png';
import batidoVainilla from '../image/cupvai.png';
import imagenDefault from '../image/cupave.png'; // Usa esta también como respaldo
import malteada from '../image/malteada.png'; // Usa esta también como respaldo


function ProductosList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost/back_s_for_you_nutrition/public/productos')
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  // Función para obtener la imagen correcta
  const obtenerImagenProducto = (nombreProducto) => {
    const nombre = nombreProducto?.toLowerCase() || '';

    switch (nombre) {
      case 'cupcake de avena':
        return cupavena;
      case 'malteada':
          return malteada;
      case 'cupcake de vainilla':
        return batidoVainilla;
      default:
        return imagenDefault; // Usa imagen importada, no string de ruta
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Nuestros productos</h2>

      <div className="productos-grid">
        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          productos.map((producto) => (
            <div key={producto.Id} className="producto-card">
              <img 
                src={obtenerImagenProducto(producto.Nombre)} 
                alt={producto.Nombre} 
                className="producto-imagen" 
              />
              <div className="producto-info">
                <h3>{producto.Nombre}</h3>
                <p><strong>Precio :</strong> ${producto.Precio}</p>
                <p><strong>Descripción :</strong> {producto.Descripcion}</p>
                <p><strong>Tamaño:</strong> {producto.Tamaño} g</p>
                <p><strong>Calorías:</strong> {producto.Calorias} kcal</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductosList;
