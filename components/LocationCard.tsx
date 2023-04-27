import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Location } from "@/lib/api";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setLocation } from "@/lib/flowSlice";
import { useRouter } from "next/router";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

interface LocationCardProps extends Location {}

export default function LocationCard({ id, name, status }: LocationCardProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const underMaintenance = status == "maintenance";
  return (
    <Card
      className="location-card"
      sx={{
        minWidth: 275,
        minHeight: 250,
        opacity: underMaintenance ? 0.5 : 1,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography sx={{ fontSize: 14 }} color="text.error.main" gutterBottom>
          {underMaintenance ? "Under maintenance" : "Available"}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      {!underMaintenance && (
        <CardActions>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              dispatch(setLocation({ id, name, status }));
              router.push("/products");
            }}
          >
            Choose location
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
