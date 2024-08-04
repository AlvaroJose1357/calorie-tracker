import { useState } from "react";
import { categorie } from "../data/categories";
import { Activity } from "../types";
export default function Form() {
  // no se definen varios states de categoria, actividad y calorias debido a que se puede hacer con un solo state, tambien de que todos ellos estan relacionados y dependen uno del otro
  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: "",
    calories: 0,
  });
  //handleChange es una funcion que recibe un evento y cambia el estado de la actividad
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // se crea una constante que verifica si el campo es un campo de numero o no
    //* el includes es un metodo que verifica si un elemento esta dentro de un array
    const isNumberField = ["calories", "category"].includes(event.target.id);
    //se cambia el estado de la actividad
    setActivity({
      //se mantiene el estado anterior para no perder los valores anteriores
      ...activity,
      //se toma el target del evento y se lo asigna a dicho target
      // el target.id es el id del elemento en el que se esta escribiendo y el target.value es lo que el usuario esta escribiendo
      // la sintaxis es [key]: value y se coloca dentro de los corchetes para tener una key dinamica
      [event.target.id]: isNumberField
        ? +event.target.value
        : event.target.value,
    });
    // esto tambien se hace para que gusrde el valor de lo que este asignado el usuario en el target
  };

  const isValidActivity = () => {
    // destructuramos la actividad para obtener el nombre y las calorias
    const { name, calories } = activity;
    // el trim es un metodo que elimina los espacios en blanco de un string
    return name.trim() !== "" && calories > 0;
  };
  return (
    //el space-y-5 es un espacio entre los elementos hijos del form
    //shadow es una sombra en el form
    <form className="space-y-5 bg-white shadow p-10 rounded-lg">
      <div className="grid grid-cols-1 gap-5">
        <label htmlFor="category" className="font-bold">
          Categorias
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full"
          id="category"
          // si se tiene un value se debe tener un onChange
          value={activity.category}
          onChange={handleChange}
        >
          {categorie.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <label htmlFor="name" className="font-bold">
          Actividad
        </label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg w-full"
          placeholder="Ejemplo: Comida, Jugo, Ensalada, Ejercicio, etc."
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-5">
        <label htmlFor="calories" className="font-bold">
          Calorias
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg w-full"
          placeholder="Ejemplo: 100"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className=" bg-gray-700 hover:bg-gray-950 w-full p-2 font-bold uppercase text-white rounded-lg cursor-pointer disabled:opacity-15"
        // se niega el valor de isValidActivity por que si es falso se deshabilita el boton
        disabled={!isValidActivity()}
      >
        {activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
      </button>
      {/* <input
        //por defecto aparece el input de tipo submit y este se podra comportar como un boton 
        //cuando es input se debera de agregar un value para que se pueda ver el texto del boton, por defecto aparecera enviar
        type="submit"
        className=" bg-gray-700 hover:bg-gray-950 w-full p-2 font-bold uppercase text-white rounded-lg cursor-pointer disabled:opacity-15"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        // se niega el valor de isValidActivity por que si es falso se deshabilita el boton
        disabled={!isValidActivity()}
      /> */}
    </form>
  );
}
