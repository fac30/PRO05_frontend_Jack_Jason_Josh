// ColoursContext.tsx

import { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { fetchData } from "../utils/fetchData";  // Update this import path

interface Colour {
  id: number;
  hex: string;
}

const ColoursContext = createContext<{ colours: Colour[]; setColours: (colours: Colour[]) => void } | undefined>(undefined);

export const ColoursProvider = ({ children }: { children: ReactNode }) => {
  const [colours, setColours] = useState<Colour[]>([]);

  // Fetch colours from an API when the provider is mounted
  const fetchColours = async () => {
    try {
      const data: Colour[] = await fetchData("colours", "GET");
      setColours(data);
    } catch (error) {
      console.error("Error fetching colours:", error);
    }
  };

  useEffect(() => {
    fetchColours(); // Fetch colours when the provider is mounted
  }, []);

  return (
    <ColoursContext.Provider value={{ colours, setColours }}>
      {children}
    </ColoursContext.Provider>
  );
};

// Named export for the hook
export const useColours = () => {
  const context = useContext(ColoursContext);
  if (!context) {
    throw new Error("useColours must be used within a ColoursProvider");
  }
  return context;
};
