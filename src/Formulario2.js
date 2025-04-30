import React, { useState, useEffect } from 'react';

function Formulario({ agregarCita, citaEditando, actualizarCita }) {
  const [formData, setFormData] = useState({
    paciente: '',
    fecha: '',
    hora: '',
    tratamiento: '',
    observaciones: '',
  });

  useEffect(() => {
    if (citaEditando) {
      setFormData(citaEditando);
    }
  }, [citaEditando]);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { paciente, fecha, hora, tratamiento } = formData;

    if (!paciente || !fecha || !hora || !tratamiento) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (formData.id) {
      actualizarCita(formData);
    } else {
      agregarCita({ ...formData, id: crypto.randomUUID() });
    }

    setFormData({
      paciente: '',
      fecha: '',
      hora: '',
      tratamiento: '',
      observaciones: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{formData.id ? 'Editar Cita' : 'Nueva Cita'}</h2>

      <label>Paciente</label>
      <input name="paciente" value={formData.paciente} onChange={handleChange} required />

      <label>Fecha</label>
      <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />

      <label>Hora</label>
      <input type="time" name="hora" value={formData.hora} onChange={handleChange} required />

      <label>Tratamiento</label>
      <input name="tratamiento" value={formData.tratamiento} onChange={handleChange} required />

      <label>Observaciones</label>
      <textarea name="observaciones" value={formData.observaciones} onChange={handleChange} />

      <button type="submit">{formData.id ? 'Guardar Cambios' : 'Agregar Cita'}</button>
    </form>
  );
}

export default Formulario;
