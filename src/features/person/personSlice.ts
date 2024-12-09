// IMPORTS
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  personDeathDate: string | null;
} = {
  personDeathDate: null,
};

const personSlice = createSlice({
  name: "person",
  initialState: initialState,
  reducers: {
    setPersonDeathDate: (state, action) => {
      state.personDeathDate = action.payload;
    },
  },
});

export const { setPersonDeathDate } = personSlice.actions;

export default personSlice.reducer;
