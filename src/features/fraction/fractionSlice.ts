// IMPORTS
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  fractionData: any;
} = {
  fractionData: null,
};

const fractionSlice = createSlice({
  name: "fraction",
  initialState,
  reducers: {
    setFractionData: (state, action) => {
      state.fractionData = action.payload;
    },
  },
});

export default fractionSlice.reducer;

export const { setFractionData } = fractionSlice.actions;
