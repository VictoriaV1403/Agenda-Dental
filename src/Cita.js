import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";


useEffect(() => {
  const citasRef = collection(db, "citas");

  const unsubscribe = onSnapshot(citasRef, (snapshot) => {
    const citasList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    console.log("Citas actualizadas desde Firestore:", citasList);
    setCitas(citasList);
  });

  return () => unsubscribe(); // Limpieza del listener al desmontar el componente
}, []);


  return (
    <div>
      <h1>Lista de Citas</h1>
      {citas.length === 0 ? (
        <p>No hay citas registradas.</p>
      ) : (
        <ul>
          {citas.map(cita => (
            <li key={cita.id}>
              <strong>{cita.nombre}</strong> - {cita.fecha} a las {cita.hora}
            </li>
          ))}
        </ul>
      )}
    </div>
  );


export default Cita;
