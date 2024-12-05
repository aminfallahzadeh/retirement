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
  },
});

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;
