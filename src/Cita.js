import React from 'react';

function Cita({ cita, eliminarCita, setCitaEditando }) {
    const { paciente, fecha, hora, tratamiento, observaciones, id } = cita;
  
    return (
      <div className="cita-card">
        <p><strong>Paciente:</strong> {paciente}</p>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>Hora:</strong> {hora}</p>
        <p><strong>Tratamiento:</strong> {tratamiento}</p>
        {observaciones && <p><strong>Observaciones:</strong> {observaciones}</p>}
  
        <button onClick={() => eliminarCita(id)}>Eliminar</button>
        <button onClick={() => setCitaEditando(cita)}>Editar</button>
      </div>
    );
  }
  

export default Cita;
