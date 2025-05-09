import React, { useEffect, useState } from 'react';
import { db } from './Firebase'; 
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

function ListaCitas({ citas, setCitaEditando, eliminar }) {
  
  

  return (
    <div>
      <h2>Lista de Citas</h2>
      {citas.map((cita) => (
        <div key={cita.id} className="cita">
          <p><strong>Paciente:</strong> {cita.paciente}</p>
          <p><strong>Fecha:</strong> {cita.fecha}</p>
          <p><strong>Hora:</strong> {cita.hora}</p>
          <p><strong>Tratamiento:</strong> {cita.tratamiento}</p>
          <p><strong>Observaciones:</strong> {cita.observaciones}</p>
          <button onClick={() => setCitaEditando(cita)}>Editar</button>
          <button onClick={() => eliminar(cita.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default ListaCitas;