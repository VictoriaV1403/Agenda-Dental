import React, { useState, useEffect } from 'react';
const obtenerDiaSemana = (fechaStr) => {
  const [year, month, day] = fechaStr.split('-');
  const fecha = new Date(year, month - 1, day); // mes inicia en 0
  return fecha.getDay();
};

const esHorarioInvalido = (fecha, hora) => {
  const dia = obtenerDiaSemana(fecha);
  const [horaNum, minutoNum] = hora.split(':').map(Number);
  const totalMinutos = horaNum * 60 + minutoNum;

  if (dia === 0) return true; // Domingo

  if (dia === 6) {
    return totalMinutos < 600 || totalMinutos > 840; // Sábado: 10:00 a 14:00
  }

  return totalMinutos < 540 || totalMinutos > 1080; // Lunes a viernes: 9:00 a 18:00
};


function Formulario({ agregarCita, citaEditando, actualizarCita }) {
  const [cita, setCita] = useState({
    paciente: '',
    fecha: '',
    hora: '',
    tratamiento: '',
    observaciones: ''
  });

  useEffect(() => {
    if (citaEditando) {
      setCita(citaEditando);
    } else {
      setCita({
        paciente: '',
        fecha: '',
        hora: '',
        tratamiento: '',
        observaciones: ''
      });
    }
  }, [citaEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCita({ ...cita, [name]: value });
  };
 
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!cita.paciente || !cita.fecha || !cita.hora || !cita.tratamiento) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    if (esHorarioInvalido(cita.fecha, cita.hora)) {
      alert('El horario seleccionado está fuera del horario de atención.');
      return;
    }
  
    if (citaEditando) {
      actualizarCita(cita);
    } else {
      agregarCita(cita);
    }
  
    setCita({
      paciente: '',
      fecha: '',
      hora: '',
      tratamiento: '',
      observaciones: ''
    });
  };
  
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="paciente"
        placeholder="Nombre del paciente"
        value={cita.paciente}
        onChange={handleChange}required
      />
      <input
        type="date"
        name="fecha"
        value={cita.fecha}
        onChange={handleChange}required
      />
      <input
        type="time"
        name="hora"
        value={cita.hora}
        onChange={handleChange}required
      />
      <textarea
        name="tratamiento"
        placeholder="Tratamiento"
        value={cita.tratamiento}
        onChange={handleChange} required
      ></textarea>
      <textarea
        name="observaciones"
        placeholder="Observaciones"
        value={cita.observaciones}
        onChange={handleChange}
      ></textarea>
      <button type="submit">{citaEditando ? 'Actualizar Cita' : 'Agregar Cita'}</button>
    </form>
  );
}

export default Formulario;
