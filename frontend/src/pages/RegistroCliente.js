import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../style/register.css'; // Estilos personalizados

function RegistroPersona() {
  const [formData, setFormData] = useState({
    Documento: '',
    Nombres: '',
    Apellidos: '',
    Telefono: '',
    Email: '',
    Direccion: '',
    Id_ciudad: '',
    Contraseña: ''
  });

  const navigate = useNavigate(); // Inicializar useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/personas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        alert('Persona registrada correctamente');
        
        // Limpiar el formulario después de registrar
        setFormData({
          Documento: '',
          Nombres: '',
          Apellidos: '',
          Telefono: '',
          Email: '',
          Direccion: '',
          Id_ciudad: '',
          Contraseña: ''
        });

        // Redirigir a la página de ingreso (login)
        navigate('/ingresar'); // Ajusta la ruta según tu configuración de rutas
      } else {
        alert('Error al registrar: ' + (result.error || ''));
      }
    } catch (err) {
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro persona</h2>
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
          type="text"
          name="Nombres"
          placeholder="Nombres"
          value={formData.Nombres}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Apellidos"
          placeholder="Apellidos"
          value={formData.Apellidos}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="Telefono"
          placeholder="Teléfono"
          value={formData.Telefono}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Direccion"
          placeholder="Dirección"
          value={formData.Direccion}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="Id_ciudad"
          placeholder="Ciudad"
          value={formData.Id_ciudad}
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
        <button type="submit">Registrar Persona</button>
      </form>
    </div>
  );
}

export default RegistroPersona;
