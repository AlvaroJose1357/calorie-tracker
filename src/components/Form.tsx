import { categorie } from "../data/categories";
export default function Form() {
  //el space-y-5 es un espacio entre los elementos hijos del form
  //shadow es una sombra en el form
  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg">
      <div className="grid grid-cols-1 gap-5">
        <label htmlFor="category" className="font-bold">
          Categorias
        </label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full"
          id="category"
        >
          {categorie.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-5">
        <label htmlFor="activity" className="font-bold">
          Actividad
        </label>
        <input
          id="activity"
          type="text"
          className="border border-slate-300 p-2 rounded-lg w-full"
          placeholder="Ejemplo: Comida, Jugo, Ensalada, Ejercicio, etc."
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
        />
      </div>
      <button
        type="submit"
        className=" bg-gray-700 hover:bg-gray-950 w-full p-2 font-bold uppercase text-white rounded-lg cursor-pointer"
      >
        Enviar
      </button>
    </form>
  );
}
