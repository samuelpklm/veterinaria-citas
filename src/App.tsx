import { useEffect, useState } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPaciente"
import { useLocalStorage } from 'usehooks-ts'

type Paciente = {
  nombre: string,
  propietario:  string ,
  email:  string ,
  fecha:  Date ,
  sintomas: string,
  id: string
}

const App: React.FC = () => {

  const [paciente, setPaciente] = useLocalStorage<Paciente[]>('pacientes',{} as Paciente[]);
  const [pacienteonly, setPacienteonly] = useState<Paciente>({} as Paciente);

  useEffect(() => {
    localStorage.setItem('paciente', JSON.stringify(paciente));
  },[paciente]);

  const eliminarPaciente = (id: string) => {
    const pacienteAztualizado = paciente.filter((only) => only.id !== id);
    setPaciente(pacienteAztualizado);

    if(id === pacienteonly.id){
      setPacienteonly({} as Paciente);
    }
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />

      <div className="mt-12 md:flex">
        <Formulario paciente={paciente} setPaciente={setPaciente} pacienteonly={pacienteonly} 
                      setPacienteonly={setPacienteonly}/>
        <ListadoPacientes paciente={paciente} setPacienteonly={setPacienteonly} eliminarPaciente={eliminarPaciente}/>
      </div>

    </div>
  )
}

export default App
