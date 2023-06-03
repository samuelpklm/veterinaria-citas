
type Paciente = {
  nombre: string,
  propietario:  string ,
  email:  string ,
  fecha:  Date ,
  sintomas: string,
  id: string
}

interface Props {
  paciente: Paciente;
  setPacienteonly: (pacienteOnly: Paciente) => void;
  eliminarPaciente: (paciente: string) => void;
}

const PacienteRegistro: React.FC<Props> = props => {

  const deletePaciente = () => {
    const respuesta = confirm("Seguro que desea borrar a este Paciente?");

    if(respuesta){
      props.eliminarPaciente(props.paciente.id);
    }
  }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
    <p className="font-bold mb-3 text-gray-700 uppercase">
      Nombre: {' '}
      <span className="font-normal normal-case">{props.paciente.nombre}</span>
    </p>
    <p className="font-bold mb-3 text-gray-700 uppercase">
      Propietario: {' '}
      <span className="font-normal normal-case">{props.paciente.propietario}</span>
    </p>
    <p className="font-bold mb-3 text-gray-700 uppercase">
      Email: {' '}
      <span className="font-normal normal-case">{props.paciente.email}</span>
    </p>
    <p className="font-bold mb-3 text-gray-700 uppercase">
      Fecha alta: {' '}
       <span className="font-normal normal-case">{props.paciente.fecha.toString()}</span>
    </p>
    <p className="font-bold mb-3 text-gray-700 uppercase">
      Sintomas: {' '}
      <span className="font-normal normal-case">{props.paciente.sintomas}</span>
    </p>

    <div className="flex justify-between mt-10">
      <button type="button"
        className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold 
                    uppercase rounded-lg" 
        onClick={() => props.setPacienteonly(props.paciente)}
      >Editar</button>

      <button type="button"
      className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold 
      uppercase rounded-lg" 
      onClick={deletePaciente}
      >Eliminar</button>
    </div>

  </div>
  );
  }
  
  export default PacienteRegistro