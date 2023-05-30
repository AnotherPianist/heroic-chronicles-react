import {useEffect} from "react";
import {createTeams} from "./setup.js";

function App() {
  useEffect(() => {
    const teams = createTeams();
  }, []);

  return (
    <>
      <div className="absolute inset-0 -z-20 bg-[url(/src/assets/beams.jpg)] bg-center"/>
      <div className="absolute inset-0 -z-10 bg-[url(/src/assets/grid.svg)] bg-center"/>
    </>
  );
}

export default App;
