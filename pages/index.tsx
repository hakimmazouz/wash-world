import LocationCard from "@/components/LocationCard";
import { Location, getLocations } from "@/lib/api";
import { Box, Container, Grid, Typography } from "@mui/material";

export default function Page({ locations }: { locations: Location[] }) {
  return (
    <Container>
      <Box sx={{ py: 8 }}>
        <Typography variant="h2" textAlign="center">
          Select a location
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {locations.map((loc) => (
          <Grid item xs={6} key={loc.id}>
            <LocationCard {...loc} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export async function getServerSideProps() {
  const { locations } = await getLocations();

  return {
    props: { locations },
  };
}
