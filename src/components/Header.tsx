import { useActivity } from "../hooks/useActivity";

export default function Header() {
  const { dispatch, ResetApp } = useActivity();
  return (
    <header className="bg-lime-600 py-3">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-center text-lg font-bold text-white uppercase px-6">
          Contador de Calorias
        </h1>
        <button
          className="px-3 mx-3 border-2 rounded-xl text-white text-sm bg-gray-600 hover:bg-gray-900 font-bold uppercase cursor-pointer disabled:opacity-10"
          disabled={!ResetApp()}
          onClick={() => dispatch({ type: "reset-APP" })}>
          Reset App
        </button>
      </div>
    </header>
  );
}
