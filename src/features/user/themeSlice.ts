// IMPORTS
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  navPanelOpen: boolean;
} = {
  navPanelOpen: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setNavPanelOpen: (state, action) => {
      state.navPanelOpen = action.payload;
    },
  },
});

export const { setNavPanelOpen } = themeSlice.actions;

export default themeSlice.reducer;
