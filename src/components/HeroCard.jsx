import heartImage from "../assets/heart.svg";
import notFound from "../assets/404.png";

export default function HeroCard({data, attackSelectable, targetSelectable, selectedAttack, onAttackSelected, onTargetSelected}) {
  function onImageError(e) {
    e.target.onerror = null;
    e.target.src = notFound;
  }

  function checkAttackSelectable() {
    return (attackSelectable ? "hover:border-2 hover:cursor-pointer" : "");
  }

  function checkSelectedAttack(attackType) {
    if (!selectedAttack)
      return "";

    const [attacker, selectedAttackType] = selectedAttack;

    return (attacker === data && selectedAttackType === attackType) ? "animate-bounce" : "";
  }

  return (
    <div
      className={`relative flex flex-col rounded-lg overflow-hidden bg-gray-50 shadow-xl ${targetSelectable && "hover:cursor-pointer"}`}
      onClick={() => targetSelectable && onTargetSelected(data)}
    >
      <img src={data["image"]["url"]} className="max-h-[300px] object-cover" onError={onImageError}/>
      <div className="absolute top-0 right-0">
        <img src={heartImage}/>
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-4 text-white">{data["hp"]}</p>
      </div>
      <div className="p-4">
        <h3>{data["name"]}</h3>
        <div className="mt-2 flex flex-col items-start">
          <p
            className={`p-1 rounded-lg ${checkAttackSelectable()} ${checkSelectedAttack("mental")}`}
            onClick={() => attackSelectable && onAttackSelected([data, "mental"])}
          >
            🧠 Mental atk. ({data["attacks"]["mental"]})
          </p>
          <p
            className={`p-1 rounded-lg ${checkAttackSelectable()} ${checkSelectedAttack("strong")}`}
            onClick={() => attackSelectable && onAttackSelected([data, "strong"])}
          >
            💪 Strong atk. ({data["attacks"]["strong"]})
          </p>
          <p
            className={`p-1 rounded-lg ${checkAttackSelectable()} ${checkSelectedAttack("fast")}`}
            onClick={() => attackSelectable && onAttackSelected([data, "fast"])}
          >
            ⚡ Fast atk. ({data["attacks"]["fast"]})
          </p>
        </div>
      </div>
    </div>
  );
}