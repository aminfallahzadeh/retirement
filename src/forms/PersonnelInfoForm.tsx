// IMPORTS
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGetPersonsQuery } from "@/features/person/personApi";
import { useGetLookupDataQuery } from "@/features/shared/sharedApi";
import { toast } from "react-toastify";
import {
  convertToPersianNumber,
  convertToPersianDateFormatted,
} from "../helper";

function PersonnelInfoForm() {
  // STATES
  const [personObject, setPersonObject] = useState({});
  const [marital, setMarital] = useState("");
  const [gender, setGender] = useState("");

  // CONSTS
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");
  const personDeathDate = searchParams.get("personDeathDate");
  const { data: person, isSuccess, error } = useGetPersonsQuery({ personID });

  // HANDLES
  useEffect(() => {
    if (isSuccess) {
      setPersonObject(person?.itemList[0]);
    }
  }, [isSuccess, person?.itemList]);

  useEffect(() => {
    if (error) {
      console.log(error);
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);

  // GET LOOKUP DATA
  const { data: genderData, isSuccess: genderSuccess } = useGetLookupDataQuery({
    lookUpType: "Gender",
    lookUpID: personObject?.genderID,
  });

  const { data: maritalStatusData, isSuccess: maritalStatusSuccess } =
    useGetLookupDataQuery({
      lookUpType: "MaritialStatus",
      lookUpID: personObject?.maritalStatusID,
    });

  useEffect(() => {
    if (maritalStatusSuccess) {
      if (maritalStatusData?.itemList?.length > 1) {
        setMarital(null);
      } else {
        setMarital(maritalStatusData.itemList[0].lookUpName);
      }
    }
  }, [maritalStatusSuccess, maritalStatusData?.itemList]);

  useEffect(() => {
    if (genderSuccess) {
      if (genderData?.itemList?.length > 1) {
        setGender(null);
      } else {
        setGender(genderData.itemList[0].lookUpName);
      }
    }
  }, [genderSuccess, genderData?.itemList]);

  const content = (
    <section className="formContainer">
      <form method="POST" className="grid grid--col-4">
        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">کد ملی</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(personObject?.personNationalCode)}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">شماره کارمندی</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(personObject?.personnelID || "-")}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">نام</div>
            <div className="inputBox__form--readOnly-content">
              {personObject?.personFirstName}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">نام خانوادگی</div>
            <div className="inputBox__form--readOnly-content">
              {personObject?.personLastName}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">شماره شناسنامه</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianNumber(personObject?.personCertificateNo || "-")}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">نام پدر</div>
            <div className="inputBox__form--readOnly-content">
              {personObject?.personFatherName || "-"}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">تاریخ تولد</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianDateFormatted(personObject?.personBirthDate)}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">محل تولد</div>
            <div className="inputBox__form--readOnly-content">
              {personObject?.personBirthPlace || "-"}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">جنسیت</div>
            <div className="inputBox__form--readOnly-content">
              {gender || "-"}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">وضعیت تاهل</div>
            <div className="inputBox__form--readOnly-content">
              {marital || "-"}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">مدرک تحصیلی</div>
            <div className="inputBox__form--readOnly-content">
              {personObject?.educationTypeCaption || "-"}
            </div>
          </div>
        </div>

        <div className="inputBox__form">
          <div className="inputBox__form--readOnly-input">
            <div className="inputBox__form--readOnly-label">ورود به خدمت</div>
            <div className="inputBox__form--readOnly-content">
              {convertToPersianDateFormatted(personObject?.employmentDate) ||
                "-"}
            </div>
          </div>
        </div>

        {personDeathDate !== "null" && (
          <div className="inputBox__form">
            <div className="inputBox__form--readOnly-input">
              <div className="inputBox__form--readOnly-label">تاریخ فوت</div>
              <div className="inputBox__form--readOnly-content">
                {convertToPersianDateFormatted(personDeathDate)}
              </div>
            </div>
          </div>
        )}
      </form>
    </section>
  );

  return content;
}

export default PersonnelInfoForm;
