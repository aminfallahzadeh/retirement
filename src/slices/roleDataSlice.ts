// SLICES
import { createSlice } from "@reduxjs/toolkit";

// TYPEs
import { RequestType } from "@/types/requestTypes";
import { RoleType } from "@/types/roleDataTypes";

const initialState: {
  requestTableData: RequestType[];
  selectedRequestData: any[];
  allRequestTableData: any[];
  selectedRequestAllRequests: any[];
  selectedRole: RoleType;
} = {
  requestTableData: [],
  selectedRequestData: [],
  allRequestTableData: [],
  selectedRequestAllRequests: [],
  selectedRole: null,
};

const roleDataSlice = createSlice({
  name: "roleData",
  initialState,
  reducers: {
    setSelectedRole: (state, action) => {
      state.selectedRole = action.payload;
    },
  },
});

export const { setSelectedRole } = roleDataSlice.actions;

export default roleDataSlice.reducer;
