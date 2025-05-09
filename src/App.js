import React, { useState, useEffect } from 'react';
import Formulario from './Formulario2';
import ListaCitas from './ListaCitas';
import './App.css';
import diente from './images/diente.png';

import { db } from './Firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

function App() {
  const [citas, setCitas] = useState([]);
  const [citaEditando, setCitaEditando] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const [mensaje, setMensaje] = useState('');

  const citasCollection = collection(db, 'citas');

  // Obtener citas desde Firestore
  const obtenerCitas = async () => {
    const data = await getDocs(citasCollection);
    const lista = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCitas(lista);
  };

  useEffect(() => {
    obtenerCitas();
  }, []);

  // Validar disponibilidad de horario (9:00 a 19:00)
  const esHorarioValido = (fecha, hora) => {
    const dia = new Date(fecha).getDay(); // 0 = domingo, 6 = sábado
    const [horaStr, minutosStr] = hora.split(':');
    const horaNum = parseInt(horaStr, 10);
    const minutosNum = parseInt(minutosStr, 10);
    const totalMinutos = horaNum * 60 + minutosNum;
  
    if (dia === 0) {
      return false;
    }
  
    if (dia === 6) {
      return totalMinutos >= 600 && totalMinutos <= 840; // 10:00 a 14:00
    }
  
    return totalMinutos >= 540 && totalMinutos <= 1140; // 9:00 a 19:00
  };
  
  
  
  

  // Validar que no se empalmen
  const hayEmpalme = (fecha, hora, idActual = null) => {
    return citas.some(cita =>
      cita.fecha === fecha &&
      cita.hora === hora &&
      cita.id !== idActual
    );
  };

  const agregarCita = async (cita) => {
    if (!esHorarioValido(cita.fecha, cita.hora)) {
      setMensaje('❌ Hora fuera del horario permitido (9:00am. a 7:00pm.)');
      ocultarMensaje();
      return false;
    }

    if (hayEmpalme(cita.fecha, cita.hora)) {
      setMensaje('❌ Ya hay una cita en esa fecha y hora');
      ocultarMensaje();
      return false;
    }

    await addDoc(citasCollection, cita);
    await obtenerCitas();
    setMensaje('✅ Cita agregada');

    ocultarMensaje();
    return true;
  };

  const actualizarCita = async (citaActualizada) => {
    if (!esHorarioValido(citaActualizada.fecha, citaActualizada.hora)) {
      setMensaje('❌ Hora fuera del horario permitido (9:00am. a 7:00pm.)');
      ocultarMensaje();
      return;
    }

    if (hayEmpalme(citaActualizada.fecha, citaActualizada.hora, citaActualizada.id)) {
      setMensaje('❌ Ya hay una cita en esa fecha y hora');
      ocultarMensaje();
      return;
    }

    const citaRef = doc(db, 'citas', citaActualizada.id);
    await updateDoc(citaRef, citaActualizada);
    setMensaje('Cita actualizada');
    setCitaEditando(null);
    obtenerCitas();
    ocultarMensaje();
  };

  const eliminarCita = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta cita?')) {
      await deleteDoc(doc(db, 'citas', id));
      setMensaje('Cita eliminada');
      obtenerCitas();
      ocultarMensaje();
    }
  };

  const ocultarMensaje = () => {
    setTimeout(() => setMensaje(''), 2500);
  };

  const citasFiltradas = citas.filter(cita => {
    const nombre = cita?.paciente || '';
    const coincideNombre = nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideFecha = filtroFecha ? cita.fecha === filtroFecha : true;
    return coincideNombre && coincideFecha;
  });

  return (
    <div className="App">
      <header className="App-header">
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
  setCitaEditando={setCitaEditando}
  eliminar={eliminarCita}
/>

        </div>
      </div>
    </div>
  );
}

export default App;
