import { useLocation } from "react-router-dom";
import ColourCard from "../components/ColourCard"; 

export default function ColourPage() {
  const location = useLocation();
  const { hexCodes } = location.state || { hexCodes: [] };

  return (
    <div className="colour-page">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">
        {hexCodes.map((hex: string) => (
          <ColourCard key={hex} hex={hex} />
        ))}
      </div>
    </div>
  );
}
