import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@mui/material";
import CollectionModal from "../components/CollectionModal/CollectionModal";

interface Collection {
  id: string;
  name: string;
  colourCollections: {
    colour: {
      id: number;
      hex: string;
      colourName: string;
    };
  }[];
}

export default function UserCollections() {
  const { userId } = useParams<{ userId: string }>();
  const [collections, setCollections] = useState<Collection[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = (colour: Colour) => {
    setOpen(true);
  };

  const getCollections = useCallback(async () => {
    try {
      const data = await fetch(
        `http://localhost:5187/collections/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const myData: Collection[] = await data.json();
      setCollections(myData);
    } catch (error) {
      console.error("Failed to fetch collections:", error);
    }
  }, [userId]);

  useEffect(() => {
    getCollections();
  }, [getCollections]);

  const handleCollectionClick = (collection: Collection) => {
    navigate("/collection", { state: { collection } });
  };

  return (
    <div>
      <h1>My Collections</h1>
      {collections.map((collection) => (
        <h2
          key={collection.id}
          onClick={() => handleCollectionClick(collection)}
          style={{ cursor: "pointer", color: "blue" }}
        >
          {collection.name}
        </h2>
      ))}
      <Button onClick={handleOpen} size="large" color="success">
        Create collection
      </Button>
      <CollectionModal open={open} setOpen={setOpen} />
    </div>
  );
}
