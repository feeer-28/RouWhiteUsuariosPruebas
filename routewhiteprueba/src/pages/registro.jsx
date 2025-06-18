import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Añadido useNavigate
import '../assets/registro.css';

const Registro = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    contrasena: '', 
    confirmarContrasena: '' 
  });
  
  const [error, setError] = useState(''); // Estado para manejar errores
  const navigate = useNavigate(); // Para redireccionar

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => { // Convertido en async
    e.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (usuario.contrasena !== usuario.confirmarContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    // Preparar datos para enviar
    const datosUsuario = {
      nombre: usuario.nombre,
      email: usuario.email,
      contrasena: usuario.contrasena
    };
    
    try {
      console.log('Usuario a registrar:', datosUsuario);
      
      // Enviar datos al backend
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(datosUsuario)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Manejar errores del servidor
        setError(data.message || 'Error en el registro');
        return;
      }
      
      // Registro exitoso
      alert('Registro exitoso!');
      navigate('/login'); // Redirigir al login
      
    } catch (err) {
      console.error('Error en el registro:', err);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="registro-container">
      {/* Panel izquierdo - Bienvenida */}
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
      
      {/* Panel derecho - Formulario de registro */}
      <div className="form-container">
        <div className="form-content">
          <h2>Crear Cuenta</h2>
          
          {error && <div className="error-message">{error}</div>}
          
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
            
            <button type="submit" className="register-button">
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