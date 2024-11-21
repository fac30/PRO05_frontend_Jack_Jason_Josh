import ColourGrid from "../ColourGrid/ColourGrid";
import { useColours } from "../../hooks/useColours";

export default function Feed() {
  const { colours } = useColours();

  return (
    <>
      <div className="w-full m-auto bg-slate-100 text-center pt-14">
        <div className="w-11/12 m-auto">
          <h2 className="text-7xl mb-32 text-center m-auto">All Our Colours</h2>
          <ColourGrid coloursArray={colours} />
        </div>
      </div>
    </>
  );
}
