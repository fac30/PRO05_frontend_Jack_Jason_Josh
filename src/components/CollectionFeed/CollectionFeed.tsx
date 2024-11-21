import ColourGrid from "../ColourGrid/ColourGrid";
import { useColours } from "../../hooks/useColours";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function CollectionFeed() {
  const [randomCollection, setRandomCollection] = useState([]);

  const navigate = useNavigate();

  const getCollections = async () => {
    const response = await fetch(`http://localhost:5187/collections`);
    const myData = await response.json();
    const collectionIds = myData.map((collection) => collection.id);
    const highestId = Math.max(...collectionIds);
    const lowestId = Math.min(...collectionIds);
    const randomId =
      Math.floor(Math.random() * (highestId - lowestId + 1)) + lowestId;
    console.log(
      `Highest ID: ${highestId}, Lowest ID: ${lowestId}, Random ID: ${randomId}`
    );

    const randomColResponse = await fetch(
      `http://localhost:5187/collections/${randomId}/colours`
    );

    const randomColData = await randomColResponse.json();

    // console.log(randomColData.collection.colourCollections);

    const randomz = randomColData.collection.colourCollections.map(
      (collection: {
        colour: { id: number; hex: string; colourName: string };
      }) => collection.colour
    );

    console.log(randomz);
    setRandomCollection(randomz);

    // setAllCollections(Array.isArray(myData) ? myData : []);
  };

  useEffect(() => {
    getCollections();
  }, []);

  //   const { colours } = useColours();

  const handleCollectionClick = (collection: Collection) => {
    navigate("/collection", { state: { collection } });
  };

  return (
    <>
      <div className="w-full m-auto bg-slate-100 text-center pt-14 pb-10">
        <div className="w-11/12 m-auto">
          <h2 className="text-7xl mb-14 text-center m-auto">
            Your Lucky Colours
          </h2>

          <div className="flex justify-center items-center mb-10">
            <ColourGrid coloursArray={randomCollection} />
          </div>
        </div>
      </div>
    </>
  );
}
