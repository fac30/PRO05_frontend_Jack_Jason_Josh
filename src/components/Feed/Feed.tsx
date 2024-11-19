import { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

interface Colour {
  id: number;
  hex: string;
}

export default function Feed() {
  const [colours, setColours] = useState<Colour[]>([]);
  const [colourNames, setColourNames] = useState<string[]>([]);

  const fetchColours = async () => {
    const data: Colour[] = await fetchData("colours", "GET");
    setColours(data);
  };

  const fetchColourNames = async () => {
    const dataArr = [];
    for (const element of colours) {
      const response = await fetch(
        `https://www.thecolorapi.com/id?hex=${element.hex}`
      );
      const data = await response.json();
      dataArr.push(data.name.value);
      console.log(dataArr);
    }
    setColourNames(dataArr);
  };

  useEffect(() => {
    fetchColours();
  }, []);

  useEffect(() => {
    fetchColourNames();
  }, [colours]);

  return (
    <>
      <h2 className="text-7xl mb-32 text-center">Today's colours</h2>
      <div className="grid grid-cols-4 w-11/12 m-auto gap-8">
        {colours.map((colour, index) => (
          <>
            <Card>
              <CardContent>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={2}
                >
                  <div
                    key={colour.id}
                    className="h-52 w-52"
                    style={{ backgroundColor: `#${colour.hex}` }}
                  ></div>
                  <Typography
                    gutterBottom
                    sx={{ color: "", fontSize: "large" }}
                  >
                    {colourNames[index]}
                  </Typography>
                  {/* <Typography variant="h5" component="div"></Typography> */}
                  {/* <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Necessitatibus eaque vel ullam.
                  </Typography> */}
                  {/* <Typography variant="body2"></Typography> */}
                </Box>
              </CardContent>
              <CardActions>
                <Box display={"flex"} justifyContent={"center"} width={"100%"}>
                  <Button size="medium">Favourite</Button>
                  <Button size="medium">Add to Palette</Button>
                </Box>
              </CardActions>
            </Card>
          </>
        ))}
      </div>
    </>
  );
}
