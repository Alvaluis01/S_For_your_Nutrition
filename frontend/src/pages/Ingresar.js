import React, { useState } from 'react';
import '../style/register.css'; // Estilos personalizados

function ValidarPersona() {
  const [formData, setFormData] = useState({
    Documento: '',
    Contraseña: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/back_your_nutrition/public/personas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('Persona validada correctamente');
        // Aquí puedes redirigir o mostrar los datos de la persona
      } else {
        alert('Error al validar: ' + (result.error || ''));
      }
    } catch (err) {
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <h2>Validar Persona</h2>
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
        <button type="submit">Validar</button>
      </form>
    </div>
  );
}

export default ValidarPersona;
