// IMPORTS
// slice imports
import { combineReducers, PayloadAction } from "@reduxjs/toolkit";
import { apiSlice } from "@/features/api/apiSlice";
import authSliceReducer from "@/features/auth/authSlice";
import roleDataReducer from "@/slices/roleDataSlice";
import itemsDataSliceReducer from "@/slices/itemsDataSlice";
import groupItemsDataSliceReducer from "@/slices/groupItemsDataSlice";
import userGroupsDataSliceReducer from "@/slices/userGroupsDataSlice";
import groupsUserDataSliceReducer from "@/slices/groupsUserDataSlice";
import archiveDataSliceReducer from "@/features/archive/archiveSlice";
import heirDataSliceReducer from "@/slices/heirDataSlice";
import slipsDataSliceReducer from "@/slices/slipsDataSlice";
import statementSliceReducer from "@/features/statement/statementSlice";
import fractionDataSliceReducer from "@/slices/fractionDataSlice";
import calculateFractionDataSliceReducer from "@/slices/calculateFractionDataSlice";
import reportGeneratorDataSliceReducer from "@/slices/reportGeneratorDataSlice";
import payCompareDataSliceReducer from "@/slices/payCompareDataSlice";
import financialDataSliceReducer from "@/slices/financialDataSlice";
import configReducer from "@/features/api/configSlice";
import roleSliceReducer from "@/features/request/roleSlice";
import userSliceReducer from "@/features/user/userSlice";
import personSliceReducer from "@/features/person/personSlice";
import personDataSliceReducer from "@/slices/personDataSlice";

export const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  role: roleSliceReducer,
  user: userSliceReducer,
  person: personSliceReducer,
  config: configReducer,
  auth: authSliceReducer,
  roleData: roleDataReducer,
  itemsData: itemsDataSliceReducer,
  groupItemsData: groupItemsDataSliceReducer,
  userGroupsData: userGroupsDataSliceReducer,
  groupsUserData: groupsUserDataSliceReducer,
  archiveData: archiveDataSliceReducer,
  heirData: heirDataSliceReducer,
  slipsData: slipsDataSliceReducer,
  statementSlice: statementSliceReducer,
  fractionData: fractionDataSliceReducer,
  calculateFractionData: calculateFractionDataSliceReducer,
  reportGeneratorData: reportGeneratorDataSliceReducer,
  payCompareData: payCompareDataSliceReducer,
  financialData: financialDataSliceReducer,
  personData: personDataSliceReducer,
});

// export const rootReducer = (state: any, action: PayloadAction) => {
//   if (action.type === "RESET") {
//     state = undefined;
//   }
//   return appReducer(state, action);
// };
