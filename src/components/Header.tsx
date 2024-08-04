export default function Header() {
  return (
    <header className="bg-lime-600 py-3">
      <div className="max-w-4xl mx-auto flex justify-between">
        <h1 className="text-center text-lg font-bold text-white uppercase px-6">
          Contador de Calorias
        </h1>
        <button className="px-3 mx-3 border-2 rounded-xl text-white hover:bg-lime-400 hover:text-black transition duration-300 ease-in-out">
          Reset App
        </button>
      </div>
    </header>
  );
}
