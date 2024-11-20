import ColourGrid from "../ColourGrid/ColourGrid";
import { useColours } from "../../hooks/useColours";

export default function Feed() {
  const { colours } = useColours(); 

  return (
    <>
      <h2 className="text-7xl mb-32 text-center">Today's colours</h2>
      <ColourGrid coloursArray={colours} />
    </>
  );
}
