import { useMemo } from "react";
import { Activity } from "../types";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  // contadores
  const caloriesConsumed = useMemo(
    () =>
      // con el metodo reduce se recorre el arreglo de actividades y se verifica si la categoria es igual a 1, si es asi se suma las calorias de la actividad
      // el 0 es el valor inicial del total de calorias
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );
  const caloriesBurned = useMemo(
    () =>
      // con el metodo reduce se recorre el arreglo de actividades y se verifica si la categoria es igual a 1, si es asi se suma las calorias de la actividad
      // el 0 es el valor inicial del total de calorias
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );
  const totalCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesBurned, caloriesConsumed]
  );
  return (
    <>
      <h2 className="text-4xl font-bold text-white text-center">
        Resumen de sus calorias
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
          calories={caloriesConsumed}
          text="Calorias consumidas"
        />
        <CalorieDisplay calories={caloriesBurned} text="Calorias quemadas" />
        <CalorieDisplay calories={totalCalories} text="Diferencia" />
      </div>
    </>
  );
}
