import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData";
import ColourGrid from "../ColourGrid/ColourGrid";

interface Colour {
  id: number;
  hex: string;
}

export default function Feed() {
  const [colours, setColours] = useState<Colour[]>([]);

  const fetchColours = async () => {
    const data: Colour[] = await fetchData("colours", "GET");
    setColours(data);
  };

  useEffect(() => {
    fetchColours();
  }, []);

  return (
    <>
      <h2 className="text-7xl mb-32 text-center">Today's colours</h2>
      <ColourGrid coloursArray={colours} />
    </>
  );
}
