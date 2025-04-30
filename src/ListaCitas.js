import React from 'react';

function ListaCitas({ citas, editar, eliminar }) {
  if (citas.length === 0) return <p>No hay citas</p>;

  return (
    <div>
      <h2>Listado de Citas</h2>
      {citas.map(cita => (
        <div key={cita.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><strong>Paciente:</strong> {cita.paciente}</p>
          <p><strong>Fecha:</strong> {cita.fecha}</p>
          <p><strong>Hora:</strong> {cita.hora}</p>
          <p><strong>Tratamiento:</strong> {cita.tratamiento}</p>
          <p><strong>Observaciones:</strong> {cita.observaciones}</p>
          <button onClick={() => editar(cita)}>Editar</button>
          <button onClick={() => eliminar(cita.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default ListaCitas;
