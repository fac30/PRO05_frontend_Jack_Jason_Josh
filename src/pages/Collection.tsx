import { useLocation } from "react-router-dom";

export default function Collection() {
  const location = useLocation();
  const { collection } = location.state; // Handle possible undefined state

  // Render a loading state if collection is undefined
  if (!collection) {
    return <div>Loading...</div>;
  }

  console.log(collection);

  return (
    <div>
      <h1>Collection Details</h1>
      <h2>Name: {collection.name}</h2>
      <p>ID: {collection.id}</p>
    </div>
  );
}
