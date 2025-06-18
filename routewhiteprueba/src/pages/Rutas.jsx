// src/pages/Rutas.jsx
import { useEffect, useState } from 'react';
import '../assets/rutas.css';
import { FaBus } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/footer';

function Rutas() {
  const [rutas, setRutas] = useState([]);
  
  // Mapeo de códigos de ruta a nombres de empresas
  const empresaMap = {
    '1TP': 'Transportes Pabón',
    '1TT': 'Transportes Tambo',
    '1TL': 'Transportes Libertad',
    'SC': 'Sotracusa'
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/rutas/listar')
      .then(res => res.json())
      .then(data => {
        console.log("Datos de la API:", data);
        setRutas(data);
      })
      .catch(err => console.error('Error cargando rutas:', err));
  }, []);

  // Agrupar rutas por empresa
  const rutasPorEmpresa = rutas.reduce((acc, ruta) => {
    // Extraer prefijo de la ruta (ej: '1TP' de '1TP001')
    const prefijo = ruta.nombre.substring(0, 3);
    const empresaNombre = empresaMap[prefijo] || 'Otras Empresas';
    
    if (!acc[empresaNombre]) {
      acc[empresaNombre] = [];
    }
    
    acc[empresaNombre].push(ruta);
    return acc;
  }, {});

  return (
    <>
      <Header />
      <main className="rutas-container">
        <h2 className="titulo-principal">Buses disponibles</h2>
        <div className="contenedor-lista">
          {Object.entries(rutasPorEmpresa).map(([empresa, rutas], index) => (
            <section key={index} className="empresa">
              <h3 className="nombre-empresa">{empresa}</h3>
              <div className="lista-rutas">
                {rutas.map((ruta, i) => (
                  <div className="ruta-card" key={i}>
                    <FaBus className="icono-bus" />
                    <div className="ruta-info">
                      <span className="ruta-nombre">{ruta.nombre}</span>
                      <span className="ruta-hora">Hora Inicio: {ruta.hora_inicio}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Rutas;