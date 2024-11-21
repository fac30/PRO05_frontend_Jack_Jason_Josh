import { useLocation } from "react-router-dom";
// import ColourCard from "../components/ColourCard";
import ColourGrid from "../components/ColourGrid/ColourGrid";

export default function ColourPage() {
  const location = useLocation();
  const colours = location.state || { hexCodes: [] };
  console.log(colours);

  return (
    <div className="colour-page">
      <div>
        <ColourGrid coloursArray={colours} />
      </div>
    </div>
  );
}
