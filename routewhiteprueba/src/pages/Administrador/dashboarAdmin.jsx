import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('tokenAdmin');
    if (!token) {
      navigate('/login-administrador');
      return;
    }

    const obtenerDatos = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/register/admin/dashboard', {
          headers: {
            Authorization: token
          }
        });

        const data = await res.json();

        if (res.ok) {
          setAdmin(data.usuario);
          setMensaje(data.mensaje);
        } else {
          localStorage.removeItem('tokenAdmin');
          navigate('/login-administrador');
        }
      } catch (err) {
        localStorage.removeItem('tokenAdmin');
        navigate('/login-administrador');
      }
    };

    obtenerDatos();
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem('tokenAdmin');
    navigate('/login-administrador');
  };

  return (
    <div style={styles.container}>
      <h1>Bienvenido, {admin?.nombre || 'Administrador'}</h1>
      <p>{mensaje}</p>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Rutas</h3>
          <p>Gestiona las rutas disponibles en el sistema.</p>
        </div>
        <div style={styles.card}>
          <h3>Usuarios</h3>
          <p>Administra usuarios, conductores y despachadores.</p>
        </div>
      </div>

      <button onClick={cerrarSesion} style={styles.logoutBtn}>Cerrar sesión</button>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginTop: '30px',
    flexWrap: 'wrap'
  },
  card: {
    width: '250px',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f5f5f5',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'left'
  },
  logoutBtn: {
    marginTop: '40px',
    padding: '10px 20px',
    backgroundColor: '#cc0000',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default DashboardAdmin;
