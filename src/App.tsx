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
        <ActivityList />
      </section>
    </>
  );
}

export default App;
