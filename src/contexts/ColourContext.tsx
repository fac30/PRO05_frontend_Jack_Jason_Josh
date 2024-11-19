import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { fetchData } from "../utils/fetchData";  

interface Colour {
  id: number;
  hex: string;
}

const ColoursContext = createContext<{ colours: Colour[]; setColours: (colours: Colour[]) => void } | undefined>(undefined);

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
    <ColoursContext.Provider value={{ colours, setColours }}>
      {children}
    </ColoursContext.Provider>
  );
};

export const useColours = () => {
  const context = useContext(ColoursContext);
  if (!context) {
    throw new Error("useColours must be used within a ColoursProvider");
  }
  return context;
};
