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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:8000/personas/${formData.Documento}`);
    const persona = await response.json();

    if (persona && persona.Contraseña === formData.Contraseña) {
      // Verificar si es cliente o administrador
      const clienteResponse = await fetch(`http://localhost:8000/personas/${persona.Id}`);
      const cliente = await clienteResponse.json();

      if (cliente) {
        navigate('/PaginaCliente'); // Redirige a página de cliente
      } else {
        navigate('/PaginaAdmin'); // Redirige a página de administrador
      }
    } else {
      alert('Documento o contraseña incorrectos');
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
