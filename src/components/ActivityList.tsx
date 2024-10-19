import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useActivity } from "../hooks/useActivity";

export default function ActivityList() {
  // se desestructura el state y dispatch del custom hook useActivity
  const { state, dispatch, categoryName, isEmptyActivities } = useActivity();
  const { activities } = state;
  return (
    <>
      <h1 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h1>
      {isEmptyActivities ? (
        <p className="text-center text-slate-400 mt-5">
          No hay actividades registradas
        </p>
      ) : (
        <div className="mt-5 ">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="px-5 py-10 flex justify-between shadow-md">
              {/* este div es para dar una descripcion de la actividad */}
              <div className="space-y-2 relative">
                <p
                  className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold rounded-2xl ${
                    activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                  }`}>
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
                  }>
                  <PencilSquareIcon className="h-8 w-8 text-gray-800 " />
                </button>
                <button
                  onClick={() =>
                    dispatch({
                      type: "delete-activity",
                      payload: { id: activity.id },
                    })
                  }>
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
