import { createContext, Dispatch, ReactNode, useReducer } from "react";
import {
  ActivityAction,
  activityReducer,
  initialState,
  ActivityState,
} from "../reducers/activity-reducer";

type ActivityContextProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityAction>;
};

type ActivityProviderProps = {
  children: ReactNode;
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  // // Verificamos si el estado es undefined o inválido
  // if (!state || !state.activities) {
  //   throw new Error("El estado no está correctamente inicializado");
  // }
  return (
    <ActivityContext.Provider value={{ state, dispatch }}>
      {children}
    </ActivityContext.Provider>
  );
};
