export interface Colour {
  id: number;
  hex: string;
  colourName: string;
}

export interface ColoursContextType {
  colours: Colour[];
  setColours: (colours: Colour[]) => void;
  fetchColours: () => Promise<void>;
} 