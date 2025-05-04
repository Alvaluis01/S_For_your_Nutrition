import React from 'react';
import '../style/contacto.css';
import facebookImage from '../image/facebook.png';
import instagramImage from '../image/insta.png';
import whatsappImage from '../image/whats.png';
import gmailImage from '../image/gmail.png';

const Contacto = () => {
    return (
        <div className="contacto-container">
            {/* Contenedor del mapa funcional */}
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Ubicación</h1>
                <p style={{ marginTop: '20px' }}>
                    <a href="https://maps.app.goo.gl/cHLEhGPThJgmrjyZ9" target="_blank" rel="noopener noreferrer">
                        Ver en Google Maps
                    </a>
                </p>
                <iframe
                  width="600"
                  height="450"
                  style={{ border: '0', borderRadius: '10px' }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.347643724665!2d-73.3587143!3d5.5422224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a7d23794b06bd%3A0xb702069bd27f8291!2sS%20For%20You%20Nutrition!5e0!3m2!1ses!2sco!4v1717525438471!5m2!1ses!2sco"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="S For You Nutrition - Tunja Boyacá"
                ></iframe>
            </div>

            {/* Redes Sociales con imágenes */}
            <div className="social-links">
                <a href="https://facebook.com/tupagina" className="social-link facebook" target="_blank" rel="noopener noreferrer">
                    <img src={facebookImage} alt="Facebook" className="social-icon" />
                    Facebook
                </a>
                <a href="https://instagram.com/tupagina" className="social-link instagram" target="_blank" rel="noopener noreferrer">
                    <img src={instagramImage} alt="Instagram" className="social-icon" />
                    Instagram
                </a>
                <a href="https://wa.me/tunumero" className="social-link whatsapp" target="_blank" rel="noopener noreferrer">
                    <img src={whatsappImage} alt="WhatsApp" className="social-icon" />
                    WhatsApp
                </a>
                <a href="mailto:tucorreo@gmail.com" className="social-link gmail" target="_blank" rel="noopener noreferrer">
                    <img src={gmailImage} alt="Gmail" className="social-icon" />
                    Gmail
                </a>
            </div>
        </div>
    );
};

export default Contacto;