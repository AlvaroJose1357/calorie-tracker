import { Activity } from "../types";

// este type lo que hace es definir la accion que se va a realizar, manejan la logica
// describe que es lo que estamos haciendo cuando queramos modificar el State de la actividad y que informacion va a modificar+
// consta de 2 partes, el type y el payload y el payload es la informacion que se va a agregar o modificar en el state
export type ActivityAction =
  | {
      type: "save-activity"; //descripcion de la accion que se va a realizar
      payload: { newActivity: Activity }; //informacion que se va a modificar o agregar en el state,
    }
  | {
      type: "set-activeID";
      payload: { id: Activity["id"] };
    }
  | {
      type: "delete-activity";
      payload: { id: Activity["id"] };
    }
  | {
      // como solamente se va a resetear la app no se necesita un payload
      type: "reset-APP";
    };
// este type lo que hace es definir el estado de la actividad que se va a realizar
export type ActivityState = {
  // se va a llamar activities y va a ser un arreglo de Activity
  activities: Activity[];
  // por un lookUp
  activeID: Activity["id"];
};

const localStorageActivities = (): Activity[] => {
  const localActivities = localStorage.getItem("activities");
  return localActivities ? JSON.parse(localActivities) : [];
};
//  el type ActivityState y la const initialState van aliados
// este es el estado inicial de la actividad que se va a realizar, iniciando con un arreglo vacio
export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeID: "",
};

// este es el reducer de la actividad que se va a realizar y recibe el state(initialState) y la accion(ActivityAction)
export const activityReducer = (
  // el state viene de activityState y de esta forma
  state: ActivityState = initialState,
  //
  action: ActivityAction
) => {
  if (action.type === "save-activity") {
    // Este codigo manejara la logica de actualizar el state
    // se retorna un nuevo estado con el arreglo de actividades y se agrega la nueva actividad

    // se crea una variable temporal en la cual este se va a llenar dependiendo de lo que entre en el condicional, inicia vacio
    let updatedActivities: Activity[] = [];
    // si en el state hay un activeID
    if (state.activeID) {
      // dicha variable guardara el mape del arreglo de actividades , si es asi se va a retornar la nueva actividad, si no se va a retornar la actividad
      updatedActivities = state.activities.map((activity) =>
        // y se va a verificar si el id de la actividad es igual al activeID, si es asi se va a retornar la nueva actividad, si no se va a retornar las actividades que ya se encuentran por que si no apareceran nulos en el arreglo
        activity.id === state.activeID ? action.payload.newActivity : activity
      );
    } else {
      // si no hay activeID se va a retornar un arreglo de actividades con la nueva actividad
      updatedActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      // se mantiene el estado anterior para no perder los valores anteriores
      ...state,
      // se agrega la nueva actividad al arreglo de actividades
      activities: updatedActivities,
      activeID: "",
    };
  }
  if (action.type === "set-activeID") {
    return {
      ...state,
      // se actualiza el activeID
      activeID: action.payload.id,
    };
  }
  if (action.type === "delete-activity") {
    return {
      ...state,
      // se filtra el arreglo de actividades y se retorna un nuevo arreglo de actividades sin la actividad que se quiere eliminar
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }
  if (action.type === "reset-APP") {
    return {
      // se resetea el estado de la aplicacion
      activities: [],
      activeID: "",
    };
  }
};
