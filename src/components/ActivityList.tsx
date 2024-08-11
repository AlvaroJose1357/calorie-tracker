import { useMemo } from "react";
import { Activity } from "../types";
import { categorie } from "../data/categories";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ActivityAction } from "../reducers/activity-reducer";

type ActivitylistProps = {
  // se define que es un arreglo de Activity
  activities: Activity[];
  // disparador
  dispatch: React.Dispatch<ActivityAction>;
};

export default function ActivityList({
  activities,
  dispatch,
}: ActivitylistProps) {
  //se crea una constante que recibe una funcion que recibe una categoria y retorna el nombre de la categoria, se usa useMemo para que no se vuelva a ejecutar la funcion cada vez que se renderiza el componente
  const categoryName = useMemo(
    // la primera arrow function es del useMemo y la segunda es la funcion que recibe la categoria de Activity y el nombre de la categoria, esa se mappea y verifica si el id de la categoria es igual a la categoria de la actividad, si es asi retorna el nombre de la categoria
    () => (category: Activity["category"]) =>
      categorie.map((cat) => (cat.id === category ? cat.name : "")),
    // se le pasa la dependencia de activities para que cada que la actividad cambie ya se agregando o modificando una actividad, se vuelva a ejecutar la funcion
    [activities]
  );
  return (
    <>
      <h1 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h1>
      {activities.length === 0 ? (
        <p className="text-center text-slate-400 mt-5">
          No hay actividades registradas
        </p>
      ) : (
        <div className="mt-5 ">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="px-5 py-10 flex justify-between shadow-md"
            >
              {/* este div es para dar una descripcion de la actividad */}
              <div className="space-y-2 relative">
                <p
                  className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold rounded-2xl ${
                    activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                  }`}
                >
                  {categoryName(+activity.category)}
                </p>
                <h3 className="text-2xl font-bold text-slate-600">
                  {activity.name}
                </h3>
                <p className="font-bold text-4xl text-lime-500">
                  {activity.calories} <span>Calorias</span>
                </p>
              </div>
              {/* este div es para los botones de eliminar y editar */}
              <div className="flex items-center gap-5">
                <button
                  onClick={() =>
                    dispatch({
                      type: "set-activeID",
                      payload: { id: activity.id },
                    })
                  }
                >
                  <PencilSquareIcon className="h-8 w-8 text-gray-800 " />
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: "delete-activity",
                      payload: { id: activity.id },
                    })
                  }
                >
                  <TrashIcon className="h-8 w-8 text-red-600 " />
                </button>
              </div>
            </div>
          ))}
        </div>
        // <ul className="mt-5">
        //   {activities.map((activity) => (
        //     <li
        //       key={activity.id}
        //       className="bg-white shadow p-5 rounded-lg mb-5"
        //     >
        //       <h3 className="text-xl font-bold text-slate-600">
        //         {activity.name}
        //       </h3>
        //       <p className="text-slate-400">Calorias: {activity.calories}</p>
        //     </li>
        //   ))}
        // </ul>
      )}
    </>
  );
}
