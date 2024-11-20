import { createContext, useState, ReactNode, useEffect } from "react";
import { fetchData } from "../utils/fetchData";
import { Colour, ColoursContextType } from "../types/colour";

export const ColoursContext = createContext<ColoursContextType | undefined>(undefined);

export const ColoursProvider = ({ children }: { children: ReactNode }) => {
  const [colours, setColours] = useState<Colour[]>([]);

  const fetchColours = async () => {
    try {
      const data: Colour[] = await fetchData("colours", "GET");
      setColours(data);
    } catch (error) {
      console.error("Error fetching colours:", error);
    }
  };

  useEffect(() => {
    fetchColours(); 
  }, []);

  return (
    <ColoursContext.Provider value={{ colours, setColours, fetchColours }}>
      {children}
    </ColoursContext.Provider>
  );
};
