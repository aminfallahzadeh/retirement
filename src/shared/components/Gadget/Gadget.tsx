// IMPORTS
import { useReducer } from "react";
import CloseIcon from "@mui/icons-material/CloseRounded";
import VerifiedIcon from "@mui/icons-material/VerifiedUserOutlined";
import GadgetsIcon from "@mui/icons-material/HomeRepairService";
import SearchIcon from "@mui/icons-material/SearchRounded";
import { CustomModal } from "@/shared/components/CustomModal";
import { SearchScreen } from "@/screens/SearchScreen";
import { InquiryScreen } from "@/screens/InquiryScreen";
import { SEARCH, NATIONAL_CODE_INQUIRY } from "@/constants/const";
import { gadgetReducer, initialState } from "./reducer";

export const Gadget = () => {
  // STATES
  const [state, dispatch] = useReducer(gadgetReducer, initialState);

  // CONTENT
  const content = (
    <>
      <CustomModal title={SEARCH} open={state.search} fullScreen={true}>
        <SearchScreen />
      </CustomModal>

      <CustomModal
        title={NATIONAL_CODE_INQUIRY}
        open={state.inquiry}
        fullScreen={true}
      >
        <InquiryScreen />
      </CustomModal>
      <div
        className="gadget-btn"
        onMouseEnter={() => dispatch({ type: "SET_LIST", payload: true })}
        onMouseLeave={() => dispatch({ type: "SET_LIST", payload: false })}
      >
        <div className="gadget-btn__icon">
          {state.search || state.inquiry ? (
            <CloseIcon onClick={() => dispatch({ type: "CLOSE_ALL" })} />
          ) : (
            <GadgetsIcon />
          )}
        </div>

        {state.list && (
          <ul className="gadget-btn__list">
            <li className="gadget-btn__list--item">
              <SearchIcon
                onClick={() => dispatch({ type: "SET_SEARCH", payload: true })}
              />
            </li>
            <li className="gadget-btn__list--item">
              <VerifiedIcon
                onClick={() => dispatch({ type: "SET_INQUIRY", payload: true })}
              />
            </li>
          </ul>
        )}
      </div>
    </>
  );
  return content;
};
