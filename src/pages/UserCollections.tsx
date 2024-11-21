import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useContext } from "react";

import CollectionModal from "../components/CollectionModal/CollectionModal";
import ColourGrid from "../components/ColourGrid/ColourGrid";
import { useAuth } from "../contexts/AuthContext"; // Assuming you have an AuthContext

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
  const { collectionUserId } = useParams<{ collectionUserId: string }>();
  const { userId } = useAuth(); // Get the logged-in user's ID
  const [collections, setCollections] = useState<Collection[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string>();

  const handleOpen = () => {
    setOpen(true);
  };

  const getCollections = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5187/collections/user/${collectionUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error("Server returned an error:", response.status);
        setCollections([]); // Default to an empty array
        return;
      }

      const myData = await response.json();
      setCollections(Array.isArray(myData) ? myData : []); // Ensure it's an array
    } catch (error) {
      console.error("Failed to fetch collections:", error);
      setCollections([]); // Default to an empty array
    }
  }, [collectionUserId]);

  useEffect(() => {
    getCollections();
    getUserName();
  }, [getCollections]);

  const getUserName = async () => {
    const response = await fetch(
      `http://localhost:5187/users/${collectionUserId}`
    );

    const myData = await response.json();
    console.log("kahsdfkjhasdf");
    console.log(myData);
    const username = myData.email.split("@")[0]; 

    setUserEmail(username);

    console.log(response);
  };

  const handleCollectionClick = (collection: Collection) => {
    navigate("/collection", { state: { collection } });
  };

  return (
    <div>
      {collectionUserId === userId ? ( // Only show the button if the user IDs match
        <>
          <h1 className="text-5xl text-center mb-10">My Collections</h1>
          <button
            onClick={handleOpen}
            className="text-center text-xl bg-jjjBlue text-white p-5 ml-16 hover:bg-[#4e758a]"
          >
            Create New Collection
          </button>
        </>
      ) : (
        <h1 className="text-5xl text-center mb-10">{`${userEmail}'s Collections`}</h1>
      )}
      <div className="w-11/12 m-auto grid grid-cols-2 gap-10 mt-10">
        {collections.length > 0 ? (
          collections.map((collection) => (
            <div
              key={collection.id}
              className="border mb-10 bg-gray-100 shadow-sm pb-8 flex flex-col justify-center"
            >
              <div className="bg-jjjBlue py-4 mb-8 hover:bg-[#4e758a]">
                <h2
                  className="ml-5 text-3xl text-white text-center"
                  onClick={() => handleCollectionClick(collection)}
                  style={{ cursor: "pointer" }}
                >
                  {collection.name}
                </h2>
              </div>
              <div className="flex justify-center items-center">
                {collection.colourCollections?.length > 0 && (
                  <ColourGrid
                    coloursArray={collection.colourCollections
                      .map((item) => item.colour) // Extract the colour object
                      .slice(0, 2)} // Display only the first two colours
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-11/12 text-center m-auto col-span-2">
            <p className=" mt-10 text-center text-7xl text-black">
              No collections found.
            </p>
          </div>
        )}
      </div>
      <CollectionModal open={open} setOpen={setOpen} />
    </div>
  );
}
