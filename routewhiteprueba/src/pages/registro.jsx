import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/registro.css';

const Registro = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    contrasena: '', 
    confirmarContrasena: '' 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que las contraseñas coincidan
    if (usuario.contrasena !== usuario.confirmarContrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    // Preparar datos para enviar a la base de datos
    const datosUsuario = {
      nombre: usuario.nombre,
      email: usuario.email,
      contrasena: usuario.contrasena // Usar contrasena en lugar de password
    };
    
    console.log('Usuario a registrar:', datosUsuario);
    alert('Registro exitoso!');
    
    // Aquí iría la conexión con la API/backend
    fetch('http://localhost:3000/api/rutas/li', {
     method: 'POST',
      headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(datosUsuario)
    })
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
                name="contrasena" // Cambiado a contrasena
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
                name="confirmarContrasena" // Cambiado a confirmarContrasena
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