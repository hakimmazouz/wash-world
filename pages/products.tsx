import ProductCard from "@/components/ProgramCard";
import {
  Location,
  Product,
  getLocationCamera,
  getLocations,
  getProducts,
} from "@/lib/api";
import { RootState } from "@/lib/store";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Page({
  products,
}: {
  washLocation: Location;
  description: string;
  products: Product[];
}) {
  const selectedLocation = useSelector(
    (state: RootState) => state.flow.selectedLocation
  );
  const router = useRouter();

  useEffect(() => {
    if (!selectedLocation) router.replace("/");
  }, []);

  return (
    <Container>
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" textAlign="center">
          Select a product
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={6} key={index}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export async function getServerSideProps() {
  const { products } = await getProducts();

  return {
    props: {
      products,
    },
  };
}
