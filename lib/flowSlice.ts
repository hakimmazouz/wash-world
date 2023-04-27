import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Location, Product, WashProgram } from "./api";
import { programDurationToMiliseconds } from "./program";

export interface FlowState {
  selectedLocation: Location | null;
  selectedProduct: Product | null;
  startedAt: number | null;
  wash: WashProgram | null;
  programDurationInMiliseconds: number;
}

const initialState: FlowState = {
  selectedLocation: null,
  selectedProduct: null,
  startedAt: null,
  wash: null,
  programDurationInMiliseconds: 0,
};

export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location>) => {
      state.selectedLocation = action.payload;
    },
    setProduct: (state, action: PayloadAction<Product>) => {
      state.selectedProduct = action.payload;
    },
    startProgram: (state, action: PayloadAction<WashProgram>) => {
      state.startedAt = Date.now();
      state.wash = action.payload;
      state.programDurationInMiliseconds = programDurationToMiliseconds(
        action.payload.estimated_duration
      );
    },
    resetFlow: (state) => {
      state.selectedLocation = null;
      state.selectedProduct = null;
      state.startedAt = null;
      state.wash = null;
      state.programDurationInMiliseconds = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProduct, setLocation, startProgram, resetFlow } =
  flowSlice.actions;

export default flowSlice.reducer;
