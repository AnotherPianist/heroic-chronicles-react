export default function WinningScreen({message, newGame}) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-10 bg-white p-10 rounded-xl shadow-2xl">
      <h2 className="text-6xl text-center">{message}</h2>
      <button className="p-4 text-2xl rounded bg-violet-300 hover:bg-violet-400" onClick={newGame}>Play again?</button>
    </div>
  );
}