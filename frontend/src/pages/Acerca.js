import React from 'react';
import '../style/register.css'; 
import '../style/products.css'; 

import nosotrosImage from '../image/nosotros.jpg'; 
import cupavena from '../image/cupave.png';
import batidoVainilla from '../image/cupvai.png';
import malteada from '../image/malteada.png';
import imagenDefault from '../image/cupave.png';

function Acerca() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* Título separado */}
      <h1 style={{ marginBottom: '40px' }}>Acerca de Nosotros</h1> 

      {/* Imagen separada en un contenedor */}
      <div style={{ marginBottom: '40px' }}>
        <img
          src={nosotrosImage} 
          alt="Descripción de la imagen" 
          style={{ width: '300px' }} 
        />
      </div>

      {/* Texto final */}
      <p style={{ fontSize: '18px', color: '#555', lineHeight: '1.6' }}>
        Porque en familia también puedes disfrutar de algo delicioso y saludable ❣️🤗<br/>
        Recuerda que puedes pedir tu Shake sin toppings y que nuestras bebidas son bajas <br/>
        en calorías y muy nutritivas (te aportan proteína, fibra, hierro, calcio, entre otros).<br/>
        ❣️ Te esperamos 🫶🏼🤗
      </p>
    </div>
  );
}

export default Acerca;
