import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

interface Colour {
  id: number;
  hex: string;
  colourName: string;
}

interface ColourGridProps {
  coloursArray: Colour[];
}

export default function ColourGrid({ coloursArray }: ColourGridProps) {
  return (
    <div className="grid grid-cols-4 w-11/12 m-auto gap-8">
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
              <Button size="medium">Add to Palette</Button>
            </Box>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
