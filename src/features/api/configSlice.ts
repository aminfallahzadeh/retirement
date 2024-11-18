// IMPORTS
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
  apiBaseUrl: string;
}

const initialState: ConfigState = {
  apiBaseUrl: "",
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<Partial<ConfigState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setConfig } = configSlice.actions;
export default configSlice.reducer;
