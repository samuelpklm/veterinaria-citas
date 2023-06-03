import { useEffect, useRef } from "react";

type Paciente = {
  nombre: string,
  propietario:  string ,
  email:  string ,
  fecha:  Date ,
  sintomas: string,
  id: string
}

interface Props {
  setPaciente: (paciente: Paciente[]) => void;
  paciente: Paciente[];
  pacienteonly: Paciente;
  setPacienteonly: (paciente: Paciente) => void;
}

const Formulario:React.FC <Props> = props => {

  
  const nombreMascota = useRef<HTMLInputElement>({} as HTMLInputElement);
  const propietarioEntrada = useRef<HTMLInputElement>({} as HTMLInputElement);
  const emailEntrada = useRef<HTMLInputElement>({} as HTMLInputElement);
  const dateEntrada = useRef<HTMLInputElement>({} as HTMLInputElement);
  const sintomasEntradas = useRef<HTMLTextAreaElement>({} as HTMLTextAreaElement);

  const generaId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  }

  useEffect(() => {
    if(Object.keys(props.pacienteonly).length > 0){

      nombreMascota.current.value = props.pacienteonly.nombre;
      propietarioEntrada.current.value = props.pacienteonly.propietario;
      emailEntrada.current.value = props.pacienteonly.email;
      dateEntrada.current.value = props.pacienteonly.fecha.toString();
      sintomasEntradas.current.value = props.pacienteonly.sintomas;

    } else {
      const formu = document.getElementById('formulario') as HTMLFormElement;
      formu.reset();
    }
  }, [props.pacienteonly]);


  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    const target = e.target as typeof e.target & {
      nombre: {value: string};
      propietario: { value: string };
      email: { value: string };
      fecha: { value: Date };
      sintomas: {value: string};
    };

    const nuevoPaciente = {
      nombre: target.nombre.value,
      propietario:  target.propietario.value ,
      email:  target.email.value ,
      fecha:  target.fecha.value ,
      sintomas: target.sintomas.value,
      id: generaId()
    }

    if(props.pacienteonly.id){
      const pacienteEditado = {
        nombre: target.nombre.value,
        propietario:  target.propietario.value ,
        email:  target.email.value ,
        fecha:  target.fecha.value ,
        sintomas: target.sintomas.value,
        id: props.pacienteonly.id
      }

      const listaAztualizada = props.paciente.map((only) => {
        if(only.id === props.pacienteonly.id){
          return pacienteEditado;
        } else {
          return only;
        }
      });
      
      props.setPaciente(listaAztualizada);
      props.setPacienteonly({} as Paciente);

    } else {
      if(props.paciente[0] === undefined){
        props.setPaciente([nuevoPaciente]);
      } else{
        props.setPaciente([...props.paciente,nuevoPaciente]);
      }
    }

    

    //reiniciar entradas
    const formu = document.getElementById('formulario') as HTMLFormElement;
    formu.reset();
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 px-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center">
        Añade Paciente y {' '}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form id='formulario' className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label className="block text-gray-700 uppercase font-bold" htmlFor="entrada">Nombre Mascota</label>
          <input 
            type='text'
            ref={nombreMascota}
            id="entrada"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            required  minLength={1} maxLength={20}
            name="nombre"
            // value={nombre}
            // onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="propietario">
              Nombre Propietario
          </label>
          <input 
            type='text'
            id="propietario"
            ref={propietarioEntrada}
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            required  minLength={1} maxLength={20}
            name="propietario"
            
          />
        </div>
        <div className="mb-5">
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="email">
              Email
          </label>
          <input 
            type='email'
            id="email"
            ref={emailEntrada}
            placeholder="Email del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            required  
            name="email"
           
          />
        </div>
        <div className="mb-5">
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="date">
              Date
          </label>
          <input 
            type='date'
            id="date"
            ref={dateEntrada}
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            required  
            name="fecha"
            
          />
        </div>
        <div className="mb-5">
          <label 
            className="block text-gray-700 uppercase font-bold" 
            htmlFor="sintomas">
              Sistomas
          </label>
          <textarea 
            id="sintomas"
            ref={sintomasEntradas}
            placeholder="Describe los sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            required  
            name="sintomas"
            
          />
        </div>
        <div className="mb-5">
          
          <input
            type="submit" 
            id="boton-submit"
            className="bg-indigo-600 p-3 text-white uppercase font-bold 
                        w-full hover:bg-indigo-700 cursor-pointer transition-colors"
            value={ props.pacienteonly.id ? "Editar paciente"  : "Agregar Paciente"}
          />
        </div>
      </form>
    </div>
  )
}

export default Formulario