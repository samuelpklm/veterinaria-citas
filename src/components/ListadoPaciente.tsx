import PacienteRegistro from "./Paciente";

type Paciente = {
  nombre: string,
  propietario:  string ,
  email:  string ,
  fecha:  Date ,
  sintomas: string,
  id: string
}

interface Props {
  paciente: Paciente[];
  setPacienteonly: (pacienteOnly: Paciente) => void;
  eliminarPaciente: (paciente: string) => void;
}


const ListadoPacientes: React.FC<Props> = props => {



    return (
      <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">

          {props.paciente && props.paciente.length ? 
          <>
            <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
              <p className="text-xl mt-5 mb-10 text-center">
                Administras tus {' '}
                <span className="text-indigo-600 font-bold text-center">Pacientes y citas</span>
              </p>

            {props.paciente.map( (paciente) => (
            <PacienteRegistro key={paciente.id} paciente={paciente} 
              setPacienteonly={props.setPacienteonly} eliminarPaciente={props.eliminarPaciente}/>
            ))} 
          </>
          : 
          <>
            <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
              <p className="text-xl mt-5 mb-10 text-center">
                Comienza agregando pacientes {' '}
                <span className="text-indigo-600 font-bold text-center">
                  y apareceran en este lugar</span>
              </p>
          </>
          }

         
        
      </div>
    )
  }
  
  export default ListadoPacientes