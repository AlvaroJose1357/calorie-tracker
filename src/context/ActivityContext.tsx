import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react";
import {
  ActivityAction,
  activityReducer,
  initialState,
  ActivityState,
} from "../reducers/activity-reducer";
import { Activity } from "../types";
import { categorie } from "../data/categories";

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityAction>;
  caloriesConsumed: number;
  caloriesBurned: number;
  totalCalories: number;
  categoryName: (category: Activity["category"]) => string[];
  isEmptyActivities: boolean;
  ResetApp: () => number;
};

type ActivityProviderProps = {
  children: ReactNode;
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  // contadores de calorias consumidas y quemadas que se usan en el componente CalorieTracker
  const caloriesConsumed = useMemo(
    () =>
      // con el metodo reduce se recorre el arreglo de actividades y se verifica si la categoria es igual a 1, si es asi se suma las calorias de la actividad
      // el 0 es el valor inicial del total de calorias
      state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );
  const caloriesBurned = useMemo(
    () =>
      // con el metodo reduce se recorre el arreglo de actividades y se verifica si la categoria es igual a 1, si es asi se suma las calorias de la actividad
      // el 0 es el valor inicial del total de calorias
      state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );
  const totalCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [caloriesBurned, caloriesConsumed]
  );

  // definicion de las categorias de las actividades que se usan en el componente ActivityList
  //se crea una constante que recibe una funcion que recibe una categoria y retorna el nombre de la categoria, se usa useMemo para que no se vuelva a ejecutar la funcion cada vez que se renderiza el componente
  const categoryName = useMemo(
    // la primera arrow function es del useMemo y la segunda es la funcion que recibe la categoria de Activity y el nombre de la categoria, esa se mappea y verifica si el id de la categoria es igual a la categoria de la actividad, si es asi retorna el nombre de la categoria
    () => (category: Activity["category"]) =>
      categorie.map((cat) => (cat.id === category ? cat.name : "")),
    // se le pasa la dependencia de activities para que cada que la actividad cambie ya se agregando o modificando una actividad, se vuelva a ejecutar la funcion
    [state.activities]
  );

  const isEmptyActivities = useMemo(
    () => state.activities.length === 0,
    [state.activities]
  );

  // este es el reset app que se va a ejecutar en el componente header
  const ResetApp = () =>
    useMemo(() => state.activities.length, [state.activities]);

  // // Verificamos si el estado es undefined o inválido
  // if (!state || !state.activities) {
  //   throw new Error("El estado no está correctamente inicializado");
  // }
  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriesConsumed,
        caloriesBurned,
        totalCalories,
        categoryName,
        isEmptyActivities,
        ResetApp,
      }}>
      {children}
    </ActivityContext.Provider>
  );
};
