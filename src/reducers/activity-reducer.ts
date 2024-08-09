import { Activity } from "../types";

// este type lo que hace es definir la accion que se va a realizar, manejan la logica
// describe que es lo que estamos haciendo cuando queramos modificar el State de la actividad y que informacion va a modificar+
// consta de 2 partes, el type y el payload y el payload es la informacion que se va a agregar o modificar en el state
export type ActivityAction = {
  type: "save-activity"; //descripcion de la accion que se va a realizar
  payload: { newActivity: Activity }; //informacion que se va a modificar o agregar en el state,
};

// este type lo que hace es definir el estado de la actividad que se va a realizar
type ActivityState = {
  // se va a llamar activities y va a ser un arreglo de Activity
  activities: Activity[];
};
//  el type ActivityState y la const initialState van aliados
// este es el estado inicial de la actividad que se va a realizar, iniciando con un arreglo vacio
export const initialState: ActivityState = {
  activities: [],
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
    return {
      // se mantiene el estado anterior para no perder los valores anteriores
      ...state,
      // se agrega la nueva actividad al arreglo de actividades
      activities: [...state.activities, action.payload.newActivity],
    };
  }
};
