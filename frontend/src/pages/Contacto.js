import React from 'react';
import '../style/register.css'; // Importa tu CSS
import facebookImage from '../image/facebook.png';  // Imagen para Facebook
import instagramImage from '../image/insta.png'; // Imagen para Instagram
import whatsappImage from '../image/whats.png'; // Imagen para WhatsApp
import gmailImage from '../image/gmail.png'; // Imagen para Gmail

function Contacto() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contáctanos</h1>

      <p className="contact-subtitle">
        ¡Estamos aquí para ayudarte! Escríbenos en cualquiera de nuestras redes:
      </p>

      <div className="contact-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="contact-icon facebook">
          <img src={facebookImage} alt="Facebook" className="contact-img" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="contact-icon instagram">
          <img src={instagramImage} alt="Instagram" className="contact-img" />
        </a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="contact-icon whatsapp">
          <img src={whatsappImage} alt="WhatsApp" className="contact-img" />
        </a>
        <a href="mailto:correo@example.com" className="contact-icon gmail">
          <img src={gmailImage} alt="Gmail" className="contact-img" />
        </a>
      </div>
    </div>
  );
}

export default Contacto;
