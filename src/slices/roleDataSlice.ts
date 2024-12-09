// IMPORTS
import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  selectedRequestData: any[];
  allRequestTableData: any[];
  selectedRequestAllRequests: any[];
} = {
  selectedRequestData: [],
  allRequestTableData: [],
  selectedRequestAllRequests: [],
};

const roleDataSlice = createSlice({
  name: "roleData",
  initialState,
  reducers: {},
});

export default roleDataSlice.reducer;
