import { createContext, useState, ReactNode, useContext } from "react";

const ColoursContext = createContext<{ colours: { hex: string }[]; setColours: (colours: { hex: string }[]) => void } | undefined>(undefined);

export const ColoursProvider = ({ children }: { children: ReactNode }) => {
  const [colours, setColours] = useState<{ hex: string }[]>([]);

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
