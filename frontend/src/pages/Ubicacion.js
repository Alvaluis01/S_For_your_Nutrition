import React from 'react';
import '../style/styles.css';  // Importa tu CSS

function Ubicacion() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Ubicación</h1>
      <p style={{ marginTop: '20px' }}>
        <a href="https://maps.app.goo.gl/axRPYEUt7A1dSFVg7" target="_blank" rel="noopener noreferrer">
          Ver en Google Maps
        </a>
      </p>
      {/* Incrustar mapa de Google Maps */}
      <iframe
        width="600"
        height="450"
        style={{ border: '0', borderRadius: '10px' }}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.154013430792!2d-122.41941618468133!3d37.77492927975927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809b8eddbbd1%3A0xe85714b9f6e80017!2sSan%20Francisco%2C%20California!5e0!3m2!1ses-419!2smx!4v1635989879423!5m2!1ses-419!2smx"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación San Francisco"
      ></iframe>
 
    </div>
  );
}

export default Ubicacion;
