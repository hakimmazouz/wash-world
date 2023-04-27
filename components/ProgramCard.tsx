import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "@/lib/api";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setProduct } from "@/lib/flowSlice";

interface ProductCardProps extends Product {}

export default function ProductCard({
  name,
  price,
  description,
  productid,
  program,
  duration,
}: ProductCardProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <Card className="program-card" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body1" component="div">
          {description} - {price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            dispatch(
              setProduct({
                name,
                price,
                description,
                productid,
                program,
                duration,
              })
            );
            router.push("/wash");
          }}
        >
          Choose Product
        </Button>
      </CardActions>
    </Card>
  );
}
