// Feed.tsx

import { useColours } from "../../contexts/ColourContext"; // Ensure the path is correct

export default function Feed() {
  const { colours } = useColours(); // Access colours from context

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
