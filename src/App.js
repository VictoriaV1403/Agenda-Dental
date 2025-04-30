import React, { useState, useEffect } from 'react';
import Formulario from './Formulario2';
import ListaCitas from './ListaCitas';
import './App.css'; // No olvides importar los estilos
import diente from './images/diente.png';

function App() {
  const [citas, setCitas] = useState(() => {
    const guardadas = localStorage.getItem('citas');
    return guardadas ? JSON.parse(guardadas) : [];
  });

  const [citaEditando, setCitaEditando] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    localStorage.setItem('citas', JSON.stringify(citas));
  }, [citas]);

  const agregarCita = cita => {
    setCitas([...citas, cita]);
    setMensaje('✅ Cita agregada');
    ocultarMensaje();
  };

  const actualizarCita = citaActualizada => {
    const actualizadas = citas.map(c =>
      c.id === citaActualizada.id ? citaActualizada : c
    );
    setCitas(actualizadas);
    setCitaEditando(null);
    setMensaje('✏️ Cita actualizada');
    ocultarMensaje();
  };

  const eliminarCita = id => {
    // eslint-disable-next-line no-restricted-globals
    if (window.confirm('¿Seguro que deseas eliminar esta cita?')) {
      setCitas(citas.filter(c => c.id !== id));
      setMensaje('🗑️ Cita eliminada');
      ocultarMensaje();
    }
  };

  const ocultarMensaje = () => {
    setTimeout(() => setMensaje(''), 2000);
  };

  const citasFiltradas = citas.filter(cita => {
    const nombre = cita?.paciente || '';
    const textoBusqueda = busqueda || '';
    const coincideNombre = nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
  
    const coincideFecha = filtroFecha ? cita.fecha === filtroFecha : true;
  
    return coincideNombre && coincideFecha;
  });

  return (
    <div className="App">
      <header className="App-header">
        {/* Aquí se agrega el logo */}
        <img src={diente} alt="Logo" className="logo" />
        <h1>Agenda Dental</h1>
      </header>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <div className="container">
        <div className="formulario">
          <h2>Registrar Cita</h2>
          <Formulario
            agregarCita={agregarCita}
            citaEditando={citaEditando}
            actualizarCita={actualizarCita}
          />
        </div>

        <div className="lista-citas">
          <h2>Citas Programadas</h2>
          <input
            type="text"
            placeholder="Buscar por paciente"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <input
            type="date"
            value={filtroFecha}
            onChange={e => setFiltroFecha(e.target.value)}
          />

          <ListaCitas
            citas={citasFiltradas}
            editar={setCitaEditando}
            eliminar={eliminarCita}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
