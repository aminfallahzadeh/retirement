type TreeModalState = {
  modalType: string | null;
};

export type TreeModalAction =
  | { type: "OPEN_MODAL"; payload: string }
  | { type: "CLOSE_MODAL" };

export const actionsReducer = (
  state: TreeModalState,
  action: TreeModalAction
): TreeModalState => {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, modalType: action.payload };
    case "CLOSE_MODAL":
      return { ...state, modalType: null };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
};
