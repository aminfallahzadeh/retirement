// slice imports
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/features/api/apiSlice";
import authSliceReducer from "@/features/auth/authSlice";
import roleDataReducer from "@/slices/roleDataSlice";
import itemsDataSliceReducer from "@/slices/itemsDataSlice";
import groupItemsDataSliceReducer from "@/slices/groupItemsDataSlice";
import userGroupsDataSliceReducer from "@/slices/userGroupsDataSlice";
import groupsUserDataSliceReducer from "@/slices/groupsUserDataSlice";
import archiveDataSliceReducer from "@/features/archive/archiveSlice";
import heirDataSliceReducer from "@/slices/heirDataSlice";
import personDataSliceReducer from "@/slices/personDataSlice";
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

const store = configureStore({
  reducer: {
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
    personData: personDataSliceReducer,
    slipsData: slipsDataSliceReducer,
    statementSlice: statementSliceReducer,
    fractionData: fractionDataSliceReducer,
    calculateFractionData: calculateFractionDataSliceReducer,
    reportGeneratorData: reportGeneratorDataSliceReducer,
    payCompareData: payCompareDataSliceReducer,
    financialData: financialDataSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
