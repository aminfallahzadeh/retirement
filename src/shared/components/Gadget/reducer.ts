// IMPORTS
import { GadgetAction } from "./types";

export const initialState: {
  search: boolean;
  list: boolean;
  inquiry: boolean;
} = {
  search: false,
  list: false,
  inquiry: false,
};

export const gadgetReducer = (state = initialState, action: GadgetAction) => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload, inquiry: false };
    case "SET_LIST":
      return { ...state, list: action.payload };
    case "SET_INQUIRY":
      return { ...state, inquiry: action.payload, search: false };
    case "CLOSE_ALL":
      return { ...state, search: false, list: false, inquiry: false };
    default:
      return state;
  }
};
