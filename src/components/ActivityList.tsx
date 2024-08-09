import { Activity } from "../types";

type ActivitylistProps = {
  // se define que es un arreglo de Activity
  activities: Activity[];
};

export default function ActivityList({ activities }: ActivitylistProps) {
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
        <div className="mt-5">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="px-5 py-10 mt-5 flex justify-between"
            >
              {/* este div es para dar una descripcion de la actividad */}
              <div className="space-y-2 relative">
                <p>{activity.category}</p>
                <h3 className="text-2xl font-bold text-slate-600">
                  {activity.name}
                </h3>
                <p className="font-bold text-4xl text-lime-500">
                  {activity.calories} <span>Calorias</span>
                </p>
              </div>
              {/* este div es para los botones de eliminar y editar */}
              <div className="flex justify-center text-center">
                <button className="bg-red-500 text-white p-2 rounded-lg mr-2">
                  Eliminar
                </button>
                <button className="bg-cyan-500 text-white rounded-lg p-2">
                  Editar
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
