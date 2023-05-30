import heartImage from "../assets/heart.svg";
import notFound from "../assets/404.png";

export default function HeroCard({data}) {
  function onImageError(e) {
    e.target.onerror = null;
    e.target.src = notFound;
  }

  return (<div className="relative flex flex-col rounded-lg overflow-hidden bg-gray-50 shadow-xl">
    <img src={data["image"]["url"]} className="max-h-[300px] object-cover" onError={onImageError} />
    <div className="absolute top-0 right-0">
      <img src={heartImage} />
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-4 text-white">{data["hp"]}</p>
    </div>
    <div className="p-4">
      <h3>{data["name"]}</h3>
      <div className="mt-2 flex flex-col items-start">
        <button className="p-1 rounded-lg hover:border-2">🧠 Mental attack ({data["attacks"]["mental"]})</button>
        <button className="p-1 rounded-lg hover:border-2">💪 Strong attack ({data["attacks"]["strong"]})</button>
        <button className="p-1 rounded-lg hover:border-2">⚡️ Fast attack ({data["attacks"]["fast"]})</button>
      </div>
    </div>
  </div>);
}