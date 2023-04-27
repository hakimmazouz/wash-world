import { resetFlow } from "@/lib/flowSlice";
import { WashingProgram } from "@/lib/program";
import { RootState } from "@/lib/store";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function WashTimer() {
  const { programDurationInMiliseconds, startedAt } = useSelector(
    (state: RootState) => state.flow
  );
  const dispatch = useDispatch();
  const wash = new WashingProgram(startedAt!, programDurationInMiliseconds);
  const [timeRemaining, setTimeRemaining] = useState(
    wash.timeReminingFormatted
  );
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(wash.timeReminingFormatted);
      if (wash.programIsDone) {
        router.push("/");
        dispatch(resetFlow());
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Typography sx={{ my: 4 }} variant="h4" textAlign="center">
      {timeRemaining}
    </Typography>
  );
}
