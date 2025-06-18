import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/registro.css';

const Registro = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    contrasena: '',
    confirmarContrasena: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario.contrasena !== usuario.confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const datosUsuario = {
      nombre: usuario.nombre,
      correo: usuario.email,
      contraseña: usuario.contrasena
    };

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
      });

      const data = await response.json();

      if (response.ok) {
        alert('¡Registro exitoso!');
        console.log('Usuario creado:', data);
        navigate('/'); // Redirige al login
      } else {
        alert(`Error al registrar: ${data.error || 'Revisa los datos ingresados'}`);
      }

    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      alert('Error al registrar. Intenta más tarde.');
    }
  };

  const handleRegistrarse = () => {
    
    navigate('/');
  };

  return (
    <div className="registro-container">
      <div className="welcome-container">
        <div className="welcome-content">
          <h1>¡Bienvenido!</h1>
          <p>Para mantenerte conectado con nosotros por favor regístrate con tu información personal</p>
          <div className="signin-container">
            <Link to="/login">
              <button className="signin-button">
                Iniciar sesión
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="form-container">
        <div className="form-content">
          <h2>Crear Cuenta</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="nombre"
                placeholder="Ingresa tu nombre completo"
                required
                onChange={handleChange}
                value={usuario.nombre}
              />
            </div>

            <div className="input-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                name="email"
                placeholder="Ingresa tu correo"
                required
                onChange={handleChange}
                value={usuario.email}
              />
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <input
                type="password"
                name="contrasena"
                placeholder="Crea una contraseña"
                required
                onChange={handleChange}
                value={usuario.contrasena}
              />
            </div>

            <div className="input-group">
              <label>Confirmar contraseña</label>
              <input
                type="password"
                name="confirmarContrasena"
                placeholder="Confirma tu contraseña"
                required
                onChange={handleChange}
                value={usuario.confirmarContrasena}
              />
            </div>

            <button onClick={handleRegistrarse} type="submit" className="register-button">
              Registrarse
            </button>
          </form>

          <div className="login-link">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
