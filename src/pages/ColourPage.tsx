import { useLocation } from "react-router-dom";
import ColourCard from "../components/ColourCard"; 

export default function ColourPage() {
  const location = useLocation();
  const { hex } = location.state || { hex: "" }; 

  return (
    <div className="colour-page">
      <ColourCard hex={hex} /> 
    </div>
  );
}
