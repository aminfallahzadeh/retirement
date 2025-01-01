export type GadgetAction =
  | { type: "SET_SEARCH"; payload: boolean }
  | { type: "SET_LIST"; payload: boolean }
  | { type: "SET_INQUIRY"; payload: boolean }
  | { type: "CLOSE_ALL" };
