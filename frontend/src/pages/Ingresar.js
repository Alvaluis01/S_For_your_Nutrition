import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/register.css';

function ValidarPersona() {


// 
  const [formData, setFormData] = useState({
    Documento: '',
    Contraseña: ''
  });

  const navigate = useNavigate();

  // ✅ Manejador de cambio en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || 'Error de validación');
        return;
      }

      // ✅ Guardar documento y redirigir
      localStorage.setItem('clienteDocumento', formData.Documento);
      alert('Inicio de sesión exitoso');
      navigate('/PaginaCliente');

    } catch (error) {
      alert('Error al conectar con el servidor');
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
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
