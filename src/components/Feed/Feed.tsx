import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData";

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
      <div className="grid grid-cols-4 w-11/12 m-auto gap-8">
        {colours.map((colour) => (
          <div
            key={colour.id}
            className="h-52 w-52"
            style={{ backgroundColor: `#${colour.hex}` }}
          ></div>
        ))}
      </div>
    </>
  );
}
