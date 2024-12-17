// IMPORTS
import { createSlice } from "@reduxjs/toolkit";
import { RoleType } from "@/shared/types/role";

const initialState: {
  role: RoleType;
} = {
  role: null,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },

    clearRole: (state) => {
      state.role = null;
    },
  },
});

export const { setRole, clearRole } = roleSlice.actions;

export default roleSlice.reducer;
