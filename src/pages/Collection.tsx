import { useLocation } from "react-router-dom";
import ColourGrid from "../components/ColourGrid/ColourGrid";
import { Colour } from "../types/colour";

interface CollectionItem {
  colour: Colour;
}

interface CollectionData {
  id: string;
  name: string;
  colourCollections: CollectionItem[];
}

export default function Collection() {
  const location = useLocation();
  const { collection } = location.state as { collection: CollectionData }; 

  if (!collection) {
    return <div>Loading...</div>;
  }

  const coloursArray = collection.colourCollections
    ? collection.colourCollections.map((item: CollectionItem) => item.colour)
    : [];

  return (
    <div>
      <h1>Collection Details</h1>
      <h2>Name: {collection.name}</h2>
      <p>ID: {collection.id}</p>
      <ColourGrid coloursArray={coloursArray}></ColourGrid>
    </div>
  );
}
