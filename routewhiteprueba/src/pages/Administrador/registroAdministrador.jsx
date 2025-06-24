import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../assets/login.css";
 // ✅ Usamos el estilo global encapsulado

const Registro = ({ rol }) => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    telefono: '',
    email: '',
    contrasena: '',
    confirmarContrasena: ''
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formulario.contrasena !== formulario.confirmarContrasena) {
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/${rol}`, formulario);
      setMensaje(response.data.mensaje || 'Registro exitoso');
      setFormulario({
        nombre: '',
        telefono: '',
        email: '',
        contrasena: '',
        confirmarContrasena: ''
      });
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al registrar');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        {/* ✅ Formulario primero */}
        <div className="right-panel">
          <h2>Registro de Administrador</h2>
          {mensaje && <p style={{ color: 'red', marginBottom: '10px' }}>{mensaje}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                required
                value={formulario.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                required
                value={formulario.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                required
                value={formulario.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                required
                value={formulario.contrasena}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmarContrasena"
                placeholder="Confirmar contraseña"
                required
                value={formulario.confirmarContrasena}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Registrarse</button>
          </form>
        </div>

        {/* ✅ Panel institucional a la derecha */}
        <div className="left-panel">
          <h1>Administrador</h1>
          <p>Registra un nuevo administrador para gestionar el sistema de rutas.</p>
          <div className="button-container">
            <Link to="/login-administrador" className="small-button">Login Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
