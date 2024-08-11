import { useEffect, useReducer } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  useEffect(() => {
    // const activities = JSON.parse(localStorage.getItem("activities") ?? "[]");
    // dispatch({ type: "set-activities", payload: { activities } });
    localStorage.setItem("activities", JSON.stringify(state?.activities));
  }, [state?.activities]);
  return (
    <>
      <Header />
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          {/* // se coloca el doble signo de interrogacion para que no de error si
          no se encuentra el state */}
          <Form dispatch={dispatch} state={state ?? initialState} />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        {/* los dobles signos de interrogacion mas conocido como operador de fusion nula proporcionar un valor predeterminado cuando una expresión es null o undefined. ?? []: Este es el operador de fusión nula. Si el resultado de state?.activities es null o undefined, entonces la expresión completa devuelve un array vacío [].*/}
        <ActivityList
          activities={state?.activities ?? []}
          dispatch={dispatch}
        />
      </section>
    </>
  );
}

export default App;
