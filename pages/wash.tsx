import WashTimer from "@/components/WashTimer";
import { startWash } from "@/lib/api";
import { startProgram } from "@/lib/flowSlice";
import { WashingProgram } from "@/lib/program";
import { RootState } from "@/lib/store";
import { Box, Button, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Wash() {
  const [loading, setLoading] = useState(false);
  const { selectedLocation, selectedProduct, wash } = useSelector(
    (state: RootState) => state.flow
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const handleStart = useCallback(async () => {
    if (selectedLocation && selectedProduct) {
      const newWash = await startWash(
        selectedLocation.id.toString(),
        selectedProduct.program.toString()
      );
      if (newWash && typeof newWash != "boolean")
        dispatch(startProgram(newWash));
    }
  }, [selectedLocation, selectedProduct]);

  useEffect(() => {
    if (!selectedLocation || !selectedProduct) router.replace("/");
  }, []);

  return (
    <Container>
      {wash ? <ProgressScreen /> : <ReadyScreen onStart={handleStart} />}
    </Container>
  );
}

const ReadyScreen = ({ onStart }: { onStart: () => {} }) => (
  <>
    <Box sx={{ py: 8 }}>
      <Typography variant="h2" textAlign="center">
        Ready to start the wash
      </Typography>
    </Box>

    <Box sx={{ py: 8, justifyContent: "center", display: "flex" }}>
      <Button
        className="start-wash"
        variant="contained"
        size="large"
        onClick={onStart}
      >
        Start wash
      </Button>
    </Box>
  </>
);

const ProgressScreen = () => {
  return (
    <>
      <Box sx={{ py: 8 }}>
        <Typography variant="h3" textAlign="center">
          Wash in progress
        </Typography>
        <WashTimer />
      </Box>
    </>
  );
};
