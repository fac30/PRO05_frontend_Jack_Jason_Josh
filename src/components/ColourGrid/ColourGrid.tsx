import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import PaletteModal from "./PaletteModal.tsx/PaletteModal";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface Colour {
  id: number;
  hex: string;
  colourName: string;
}

interface ColourGridProps {
  coloursArray: Colour[];
}

export default function ColourGrid({ coloursArray }: ColourGridProps) {
  const [collections, setCollections] = useState<[]>([]); // Ensure it's an array by default
  const { userId } = useAuth();
  const [selectedColour, setSelectedColour] = useState<Colour | null>(null); // Track selected colour

  const getCollections = async () => {
    const data = await fetch(
      `http://localhost:5187/collections/user/${userId}`,
      {
        method: "GET", // or whatever method you need (POST, PUT, etc.)
        headers: {
          "Content-Type": "application/json",
          // You can add other headers here if needed
        },
        credentials: "include", // This will send cookies and authentication data
      }
    );

    const myData = await data.json();

    // console.log(myData);

    setCollections(myData);
  };

  useEffect(() => {
    getCollections();
  }, [userId]);

  const [open, setOpen] = useState(false);

  // Function to handle opening the modal
  const handleOpen = (colour: Colour) => {
    setSelectedColour(colour); // Set the colour when opening the modal
    setOpen(true);
  };
  // Function to handle closing the modal (this would be passed to PaletteModal)
  // const handleClose = () => setOpen(false);

  return (
    <div className="flex flex-wrap w-11/12 m-auto gap-8">
      {coloursArray.map((colour) => (
        <Card key={colour.id}>
          <CardContent>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={2}
            >
              <div
                className="h-52 w-52"
                style={{ backgroundColor: `#${colour.hex}` }}
              ></div>
              <Typography gutterBottom sx={{ color: "", fontSize: "large" }}>
                {colour.colourName}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box display={"flex"} justifyContent={"center"} width={"100%"}>
              <Button size="medium">Favourite</Button>
              <Button onClick={() => handleOpen(colour)} size="medium">
                Add to Palette
              </Button>
              {selectedColour && (
                <PaletteModal
                  colour={selectedColour} // Pass the selected colour here
                  open={open}
                  setOpen={setOpen}
                  userCollections={collections}
                />
              )}
            </Box>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
