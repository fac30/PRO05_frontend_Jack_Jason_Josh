import { useLocation } from "react-router-dom";
import ColourGrid from "../components/ColourGrid/ColourGrid";
import Colours from "./Colours";

export default function Collection() {
  const location = useLocation();
  const { collection } = location.state; // Handle possible undefined state

  // Render a loading state if collection is undefined
  if (!collection) {
    return <div>Loading...</div>;
  }

  const coloursArray = collection.colourCollections
    ? collection.colourCollections.map((item) => item.colour)
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
