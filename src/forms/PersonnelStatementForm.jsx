// REACT IMPORTS
import { useState } from "react";

// REDUX
import { useDispatch } from "react-redux";
import { useLazyGetPersonsQuery } from "../slices/personApiSlice";
import { setPersonTableData } from "../slices/personDataSlice";

// MUI
import { LoadingButton } from "@mui/lab";
import { SearchOutlined as SearchIcon } from "@mui/icons-material";

// LIBRARIES
import { toast } from "react-toastify";

// HELPER
import { convertToPersianNumber, convertToEnglishNumber } from "../helper";

function PersonnelStatementForm() {
  const [searchPersons, { isLoading, isFetching }] = useLazyGetPersonsQuery();
  const dispatch = useDispatch();

  // PERSONNEL OBJECT STATES
  const [personnelObject, setPersonnelObject] = useState(null);

  const hadnlePersonnelObjectChange = (e) => {
    const { name, value } = e.target;
    setPersonnelObject({ ...personnelObject, [name]: value });
  };

  const disableButton =
    !personnelObject ||
    (!personnelObject.personFirstName &&
      !personnelObject.personLastName &&
      !personnelObject.personNationalCode &&
      !personnelObject.personnelID);

  // SEARCH HANDLER
  const handleSearchPersonnels = async () => {
    try {
      const personnelID = personnelObject?.personnelID || "";
      const personFirstName = personnelObject?.personFirstName || "";
      const personLastName = personnelObject?.personLastName || "";
      const personNationalCode = personnelObject?.personNationalCode || "";

      const searchRes = await searchPersons({
        personnelID: convertToEnglishNumber(personnelID),
        personFirstName,
        personLastName,
        personNationalCode: convertToEnglishNumber(personNationalCode),
      }).unwrap();
      if (searchRes.itemList.length === 0) {
        toast.error("نتیجه ای یافت نشد", {
          autoClose: 2000,
        });
        return;
      }
      const mappedData = searchRes.itemList.map((item, index) => ({
        id: item.personID,
        personRowNum: index + 1,
        personDeathDate: item.personDeathDate,
        personnelID: item.personnelID,
        personNationalCode: item.personNationalCode,
        personFirstName: item.personFirstName,
        personLastName: item.personLastName,
      }));
      dispatch(setPersonTableData(mappedData));
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error, {
        autoClose: 2000,
      });
    }
  };

  const content = (
    <section className="formContainer flex-col">
      <form method="POST" className="grid grid--col-4" noValidate>
        <div className="inputBox__form">
          <input
            type="text"
            id="personNationalCode"
            className="inputBox__form--input"
            value={convertToPersianNumber(personnelObject?.personNationalCode)}
            name="personNationalCode"
            onChange={hadnlePersonnelObjectChange}
            required
          />
          <label htmlFor="personNationalCode" className="inputBox__form--label">
            کد ملی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="personnelID"
            className="inputBox__form--input"
            value={convertToPersianNumber(personnelObject?.personnelID)}
            name="personnelID"
            onChange={hadnlePersonnelObjectChange}
            required
          />
          <label htmlFor="personnelID" className="inputBox__form--label">
            شماره کارمندی
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="personFirstName"
            className="inputBox__form--input"
            name="personFirstName"
            onChange={hadnlePersonnelObjectChange}
            required
          />
          <label htmlFor="personFirstName" className="inputBox__form--label">
            نام
          </label>
        </div>
        <div className="inputBox__form">
          <input
            type="text"
            id="personLastName"
            className="inputBox__form--input"
            name="personLastName"
            onChange={hadnlePersonnelObjectChange}
            required
          />
          <label htmlFor="personLastName" className="inputBox__form--label">
            نام خانوادگی
          </label>
        </div>
      </form>

      <div style={{ marginRight: "auto" }} className="flex-row">
        <LoadingButton
          dir="ltr"
          endIcon={<SearchIcon />}
          disabled={disableButton}
          variant="contained"
          color="primary"
          loading={isLoading || isFetching}
          onClick={handleSearchPersonnels}
          sx={{ fontFamily: "sahel" }}
        >
          <span>جست و جو</span>
        </LoadingButton>
      </div>
    </section>
  );

  return content;
}

export default PersonnelStatementForm;
