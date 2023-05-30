export default function HeroCard({data}) {
  return (<div className="flex flex-col rounded-lg bg-gray-50">
      <img src={data["image"]["url"]} className="max-h-[300px]" />
      <h4>{data["name"]}</h4>
    </div>);
}