import { TbSquareArrowUp, TbSquareArrowDown, TbPlayerPause, TbPlayerPlay, TbPlaystationX } from "react-icons/tb";
import lebronJames from "../recursos/lebron.mp3"
import { useState, useEffect } from "react";

function App() {
  const [descanso, setDescanso] = useState(5);
  const [duracion, setDuracion] = useState(25);
  const [empezar, setEmpezar] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(duracion * 60);
  const [descansoRestante, setDescansoRestante] = useState(descanso * 60); 
  const [cambio, setCambio] = useState(false);
  // Duración en segundos
  const [rojo, setRojo] = useState(false);

  const lebron = new Audio(lebronJames);

  const sumarDescanso = () => {
    setDescanso(descanso + 1);
    setDescansoRestante((descanso + 1) * 60)
  };

  const restarDescanso = () => {
    if (descanso > 1) {
      setDescanso(descanso - 1);
      setDescansoRestante((descanso - 1) * 60)
    }
  };

  const sumarDuracion = () => {
    setDuracion(duracion + 1);
    setTiempoRestante((duracion + 1) * 60);
  };

  const restarDuracion = () => {
    if (duracion > 1) {
      setDuracion(duracion - 1);
      setTiempoRestante((duracion - 1) * 60);
    }
  };

  const reset = () => {
    setDuracion(25);
    setDescanso(5);
    setEmpezar(false);
    setTiempoRestante(25 * 60);
    setDescansoRestante(5 * 60)
  };

  const pausarCronometro = () => {
    setEmpezar(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  

const empezarReloj = ()=>{
  setEmpezar(true)
}
  useEffect(() => {
    let intervalId;
    if (empezar && tiempoRestante > 0) {
      intervalId = setInterval(() => {
        setTiempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (empezar && tiempoRestante === 0) {
      clearInterval(intervalId);
      // Aquí puedes agregar el código que deseas ejecutar al finalizar el temporizador
    }
    return () => clearInterval(intervalId);
  }, [empezar, tiempoRestante]);

  useEffect(() => {
    let intervalId;
    if (empezar && descansoRestante > 0) {
      intervalId = setInterval(() => {
        setDescansoRestante((prev) => prev - 1);
      }, 1000);
    } else if (empezar && descansoRestante === 0) {
      clearInterval(intervalId);
      // Aquí puedes agregar el código que deseas ejecutar al finalizar el temporizador
    }
    return () => clearInterval(intervalId);
  }, [empezar, tiempoRestante]);

  useEffect(() => {
    if(tiempoRestante == 60){
      lebron.play()
    }
    if (tiempoRestante < 60) {
      setRojo(true);
    } else {
      setRojo(false);
    }
    
  }, [tiempoRestante]);

  useEffect(() => {
    if (tiempoRestante !== 0) {
      setCambio(true);
    } else {
      setCambio(false);
    }
    
  }, [tiempoRestante]);


  useEffect(() => {
    if(!cambio){
      if(descansoRestante == 60){
        lebron.play()
      }
      if (descansoRestante > 59) {
        setRojo(false);
      } else {
        setRojo(true);
      }  
    }
  }, [descansoRestante]);

  
  useEffect(() => {
    if(!cambio){
      if (descansoRestante > 0) {
        setCambio(false)
      } else {
        setCambio(true);
      }
    }

  }, [descansoRestante]);


  return (

    <div className="bg-[#050505ef] h-screen">
      <div className="flex h-full max-w-xl flex-col m-auto items-center justify-center font-fontTitulo text-4xl font-light text-[#b039ffc1] cursor-default">
        {/* Parte del titulo */}
      <div>
      <h1 className="text-5xl py-4 text-white">{duracion} + {descanso} <span className="text-[#b039ffc1]">Pomodoro</span></h1>
      </div>
      {/* Parte del descanso y la sesión */}
      <div className="flex justify-between w-[28rem]">
      {/* Parte izquierda*/}
        <div className="flex flex-col">
          <h4 className="text-3xl">Tiempo de Descanso</h4>
          <div className="flex gap-5 justify-center items-center">
            <button
              onClick={() => sumarDescanso()}
              className="text-white text-4xl hover:text-[#cd8ef7e5]"><TbSquareArrowUp /></button>
            <p className="text-white text-4xl">{descanso}</p>
            <button
              onClick={() => restarDescanso()}
              className="text-4xl hover:text-[#64218ee5]"><TbSquareArrowDown /></button>
          </div>
        </div>
        {/* Parte derecha*/}
        <div className="flex flex-col">
          <h4 className="text-3xl">Duración de la sesión</h4>
          <div className="flex gap-5 justify-center items-center">
            <button
              onClick={() => sumarDuracion()}
              className="text-4xl hover:text-[#64218ee5]" ><TbSquareArrowUp /></button>
            <p className="text-white text-4xl">{duracion}</p>
            <button
              onClick={() => restarDuracion()}
              className="text-white text-4xl hover:text-[#cd8ef7e5]"><TbSquareArrowDown /></button>
          </div>
        </div>
      </div>

      {/* Parte del reloj*/}
      <div className="mt-6 py-2 flex flex-col justify-center items-center border border-[#b039ffc1] rounded-md  w-60">
        <h3>Sesión</h3>
        <p className={`py-4 text-5xl text-white ${rojo ? "text-[red]" : "text-white"}`}>{cambio ? formatTime(tiempoRestante) : formatTime(descansoRestante)}</p>
      </div>
      <div className="flex gap-5 my-5">
        <button
          onClick={() => empezarReloj()}
        ><TbPlayerPlay /></button>
        <button
          onClick={() => pausarCronometro()}
        ><TbPlayerPause /></button>
        <button
          onClick={() => reset()}
        ><TbPlaystationX /></button>
      </div>
      <div>
        <h3 className="text-white">by <a href="https://www.linkedin.com/in/jeronimo-vega-42375b196/" target={"_blank"} className="text-[#b039ffc1] hover:text-[#4f1576c1]">jerovega</a></h3>
      </div>
      </div>
    </div>
  )
}

export default App
