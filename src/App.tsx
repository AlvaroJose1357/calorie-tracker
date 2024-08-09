import { useReducer } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import ActivityList from "./components/ActivityList";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);
  console.log(state);
  return (
    <>
      <Header />
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form dispatch={dispatch} />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        {/* los dobles signos de interrogacion mas conocido como operador de fusion nula proporcionar un valor predeterminado cuando una expresión es null o undefined. ?? []: Este es el operador de fusión nula. Si el resultado de state?.activities es null o undefined, entonces la expresión completa devuelve un array vacío [].*/}
        <ActivityList activities={state?.activities ?? []} />
      </section>
    </>
  );
}

export default App;
