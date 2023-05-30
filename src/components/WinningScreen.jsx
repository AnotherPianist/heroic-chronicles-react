import {useReward} from "react-rewards";
import {useEffect} from "react";
import {PLAYER_WIN_MESSAGE} from "../battle.js";

export default function WinningScreen({message, newGame}) {
  const { reward, isAnimating } = useReward("rewardId", "confetti", {lifetime: 3000, elementCount: 300, spread: 180});

  useEffect(() => {
    if (message === PLAYER_WIN_MESSAGE)
      reward();
  }, []);

  return (
    <div id="rewardId" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-10 bg-white p-10 rounded-xl shadow-2xl">
      <h2 className="text-6xl text-center">{message}</h2>
      <button className="p-4 text-2xl rounded bg-violet-300 hover:bg-violet-400" onClick={newGame}>Play again?</button>
    </div>
  );
}