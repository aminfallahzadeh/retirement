// IMPORTS
import { createSlice } from "@reduxjs/toolkit";
import { RequestType } from "@/shared/types/requestTypes";

const initialState: {
  requestTableData: RequestType[];
  selectedRequestData: any[];
  allRequestTableData: any[];
  selectedRequestAllRequests: any[];
} = {
  requestTableData: [],
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
