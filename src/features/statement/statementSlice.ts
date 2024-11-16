import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredPersonsTableData: [],
  isDataRecieved: false,
};

const statementSlice = createSlice({
  name: "statementSlice",
  initialState,
  reducers: {
    setFilteredPersonsTableData: (state, action) => {
      state.filteredPersonsTableData = action.payload;
    },
  },
});

export const { setFilteredPersonsTableData } = statementSlice.actions;

export default statementSlice.reducer;
