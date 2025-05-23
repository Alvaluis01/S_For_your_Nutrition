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
      <h1>Acerca de Nosotros</h1>

      {/* Usar la imagen importada */}
      <img
        src={nosotrosImage} 
        alt="Descripción de la imagen" 
        style={{ width: '300px', marginTop: '20px' }} 
      />

      <h1 style={{ marginTop: '20px', fontSize: '18px', color: '#555' }}>
      Porque en familia también puedes disfrutar de algo delicioso y saludable ❣️🤗<br/>
      Recuerda que puedes pedir tu Shake sin toppings y que nuestras bebidas son bajas <br/>
      en calorías y muy nutritivas (te aportan proteína,  fibra, hierro, calcio, entre otros)<br/>
      ❣️ Te esperamos 🫶🏼🤗
      </h1>
    </div>
  );
}

export default Acerca;
