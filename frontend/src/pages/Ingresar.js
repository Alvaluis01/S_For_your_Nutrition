import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';

function ValidarPersona() {
  const [formData, setFormData] = useState({
    Documento: '',
    Contraseña: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Puedes cambiar estas contraseñas por valores más seguros o validados desde backend
    if (formData.Contraseña === 'admin123') {
      navigate('/PaginaAdmin'); // Redirige a página de administrador
    } else if (formData.Contraseña === 'cliente123') {
      navigate('/PaginaCliente'); // Redirige a página de cliente
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <div className="login-container">
      <h2>Ingresar</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="Documento"
          placeholder="Documento"
          value={formData.Documento}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="Contraseña"
          placeholder="Contraseña"
          value={formData.Contraseña}
          onChange={handleChange}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default ValidarPersona;
