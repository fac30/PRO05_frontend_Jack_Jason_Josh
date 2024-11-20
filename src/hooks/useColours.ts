import { useContext } from "react";
import { ColoursContext } from "../contexts/ColourContext";

export const useColours = () => {
  const context = useContext(ColoursContext);
  if (!context) {
    throw new Error("useColours must be used within a ColoursProvider");
  }
  return context;
}; 