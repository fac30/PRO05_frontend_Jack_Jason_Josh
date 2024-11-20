import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface Collection {
  id: string;
  name: string;
}

export default function Collection() {
  const { userId } = useParams<{ userId: string }>();
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  const getCollections = async () => {
    const data = await fetch(
      `http://localhost:5187/collections/user/${userId}`
    );

    const myData = await data.json();

    console.log(myData);

    setCollections(myData);
  };

  useEffect(() => {
    getCollections();
  }, []);

  const handleCollectionClick = (collection) => {
    console.log("clicked motherfucker");
    console.log(collection);
    // Navigate to the collection's page, passing the collection data
    navigate("/collection", { state: { collection } });
  };

  return (
    <div>
      <h1>My Collections</h1>
      {collections.map((collection, index) => {
        return (
          <h2
            key={collection.id}
            onClick={() => handleCollectionClick(collection)}
            style={{ cursor: "pointer", color: "blue" }}
          >
            {collection.name}
          </h2>
        );
      })}
    </div>
  );
}