import React, { useState } from 'react';
import '../style/register.css';
import '../style/micuenta.css';
import { Link } from 'react-router-dom'; // Usar Link para navegación


function RegistroPersona() {
  const [formData, setFormData] = useState({
    Documento: '',
    Nombres: '',
    Apellidos: '',
    Telefono: '',
    Email: '',
    Direccion: '',
    Id_ciudad: '',
    Contraseña: '',
    Foto: null
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'Foto') {
      const file = files[0];
      setFormData({ ...formData, Foto: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost/back_your_nutrition/public/personas', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        alert('Persona registrada correctamente');
        setFormData({
          Documento: '',
          Nombres: '',
          Apellidos: '',
          Telefono: '',
          Email: '',
          Direccion: '',
          Id_ciudad: '',
          Contraseña: '',
          Foto: null
        });
        setPreview(null);
      } else {
        alert('Error al registrar: ' + (result.error || ''));
      }
    } catch (err) {
      alert('Error al conectar con el servidor');
    }
  };

  return (


<div >
  <nav className="menu-cliente">
          <div className="contenido-cliente">
            <div className="logo">
              <h2>S´ FOR YOUR NUTRITION</h2>
            </div>
            <ul className="menu-links">
              <li><Link to="/pedidos">Pedidos</Link></li>
              <li><Link to="/notificaciones">Notificaciones</Link></li>
              <li><Link to="/inventario">Inventario</Link></li>
              <li><Link to="/micuentaadmin">Mi Cuenta</Link></li>
            </ul>
          </div>
        </nav>

    <div>
        {/* Menú horizontal */}
    
<div className="registro-container">
    </div>
    <h2>Mi Perfil Admin</h2>
        <form onSubmit={handleSubmit} className="registro-form" encType="multipart/form-data">
          <div className="foto-preview">
            {preview ? (
              <img src={preview} alt="Foto de perfil" />
            ) : (
              <div className="placeholder">Foto</div>
            )}
            <input type="file" name="Foto" accept="image/*" onChange={handleChange} />
          </div>
  
          <input type="number" name="Documento" placeholder="Documento" value={formData.Documento} onChange={handleChange} required />
          <input type="text" name="Nombres" placeholder="Nombres" value={formData.Nombres} onChange={handleChange} required />
          <input type="text" name="Apellidos" placeholder="Apellidos" value={formData.Apellidos} onChange={handleChange} required />
          <input type="number" name="Telefono" placeholder="Teléfono" value={formData.Telefono} onChange={handleChange} required />
          <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} required />
          <input type="text" name="Direccion" placeholder="Dirección" value={formData.Direccion} onChange={handleChange} required />
          <input type="text" name="Id_ciudad" placeholder="Ciudad" value={formData.Id_ciudad} onChange={handleChange} required />
          <input type="password" name="Contraseña" placeholder="Contraseña" value={formData.Contraseña} onChange={handleChange} required />
  
          <button type="submit">Guardar datos</button>
        </form>
    <div>

    </div>
        
        
      </div>
</div>
    
  );
}

export default RegistroPersona;

