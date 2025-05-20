import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';

function ValidarPersona() {
  const [formData, setFormData] = useState({
    Nombres: '',       // Cambiado de "Documento" a "Nombres"
    Contraseña: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Cambio en la lógica: ahora buscamos por "Nombres" en lugar de "Documento"
    const response = await fetch(`http://localhost:8000/personas?Nombres=${formData.Nombres}`);
    const personas = await response.json();

    // Verificar si existe un usuario con esos nombres y contraseña
    const personaValida = personas.find(
      (persona) => persona.Nombres === formData.Nombres && persona.Contraseña === formData.Contraseña
    );

    if (personaValida) {
      // Verificar rol (cliente o administrador)
      const clienteResponse = await fetch(`http://localhost:8000/personas/${personaValida.Id}`);
      const cliente = await clienteResponse.json();

      if (cliente) {
        navigate('/PaginaCliente'); 
      } else {
        navigate('/PaginaAdmin'); 
      }
    } else {
      alert('Nombres o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar </h2>
      <form onSubmit={handleSubmit}>
  <label>
    Nombre de Usuario
    <input
      type="text"
      name="Nombres"
      value={formData.Nombres}
      onChange={handleChange}
      required
    />
  </label>
  <label>
    Contraseña
    <input
      type="password"
      name="Contraseña"
      value={formData.Contraseña}
      onChange={handleChange}
      required
    />
  </label>
  <button type="submit">Iniciar Sesión</button>
</form>

    </div>
  );
}

export default ValidarPersona;
