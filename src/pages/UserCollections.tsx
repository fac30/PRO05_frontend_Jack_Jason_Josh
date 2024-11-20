import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@mui/material";
import CollectionModal from "../components/CollectionModal/CollectionModal";
import ColourGrid from "../components/ColourGrid/ColourGrid";

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
  const handleOpen = () => {
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
      <h1 className="text-5xl text-center mb-10">My Collections</h1>
      <div className="flex flex-wrap grid-cols-2">
        {collections.map((collection) => (
          <>
            <div className="border mb-10  m-auto bg-gray-100 shadow-sm pb-8">
              <div className=" bg-gray-500 py-4 mb-8">
                <h2
                  className=" ml-5 text-3xl text-white"
                  key={collection.id}
                  onClick={() => handleCollectionClick(collection)}
                  style={{ cursor: "pointer" }}
                >
                  {collection.name}
                </h2>
              </div>
              {collection &&
                collection.colourCollections &&
                Array.isArray(collection.colourCollections) && (
                  <ColourGrid
                    coloursArray={collection.colourCollections
                      .map((item) => item.colour) // Get the colour object from each item
                      .slice(0, 2)} // Take the first 3 colours
                  />
                )}
            </div>
          </>
        ))}
      </div>
      <Button onClick={handleOpen} size="large" color="success">
        Create collection
      </Button>
      <CollectionModal open={open} setOpen={setOpen} />
    </div>
  );
}
