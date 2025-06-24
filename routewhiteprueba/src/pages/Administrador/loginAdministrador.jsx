import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/login.css'; // ✅ Ajusta la ruta si lo mueves de carpeta

const LoginAdministrador = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    email: '',
    contrasena: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/administradores/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('tokenAdmin', data.token);
        navigate('/admin/dashboard'); // ✅ Cambia a tu ruta real
      } else {
        setMensaje(data.msg || 'Credenciales incorrectas');
      }
    } catch {
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        {/* Formulario a la izquierda */}
        <div className="right-panel">
          <h2>Login Administrador</h2>
          {mensaje && <p style={{ color: 'red', marginBottom: '10px' }}>{mensaje}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={datos.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                value={datos.contrasena}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Iniciar sesión</button>
          </form>
        </div>

        {/* Panel institucional a la derecha */}
        <div className="left-panel">
          <h1>Panel Admin</h1>
          <p>Inicia sesión para gestionar rutas, usuarios y más.</p>
          <div className="button-container">
            <Link to="/registro-administrador" className="small-button">Registrarse</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdministrador;
