// IMPORTS
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetPersonsQuery } from "@/features/person/personApi";
import { useGetLookupDataQuery } from "@/features/shared/sharedApi";
import { PersonnelInfoType } from "./types";
import { Box, CircularProgress } from "@mui/material";
import { FieldView } from "@/shared/components/FieldView";
import {
  NATIONAL_CODE,
  PERSONNEL_NO,
  FIRST_NAME,
  LAST_NAME,
  CERTIFICATE_NO,
  FATHER_NAME,
  BIRTH_DATE,
  BIRTH_PLACE,
  GENDER,
  MARITIAL_STATUS,
  EDUCATION_DEGREE,
  START_EMPLOYMENT_DATE,
  DEATH_DATE,
} from "@/constants/const";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";

export const PersonnelInfo = () => {
  // STATES
  const [data, setData] = useState<PersonnelInfoType | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [marital, setMarital] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  // CONSTS
  const personID = searchParams.get("personID");
  const personDeathDate = searchParams.get("personDeathDate");
  const {
    data: personnel,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetPersonsQuery({ personID });
  const { data: genderData, isSuccess: genderSuccess } = useGetLookupDataQuery({
    lookUpType: "Gender",
    lookUpID: data?.genderID,
  });
  const { data: maritalStatusData, isSuccess: maritalStatusSuccess } =
    useGetLookupDataQuery({
      lookUpType: "MaritialStatus",
      lookUpID: data?.maritalStatusID,
    });

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      setData(personnel?.itemList[0]);
    }
  }, [isSuccess, personnel]);

  useEffect(() => {
    if (genderSuccess) {
      if (genderData?.itemList?.length > 1) {
        return;
      } else {
        setGender(genderData.itemList[0].lookUpName);
      }
    }
  }, [genderSuccess, genderData]);

  useEffect(() => {
    if (maritalStatusSuccess) {
      if (maritalStatusData?.itemList?.length > 1) {
        return;
      } else {
        setMarital(maritalStatusData.itemList[0].lookUpName);
      }
    }
  }, [maritalStatusSuccess, maritalStatusData]);

  // CONTENT
  const content = (
    <>
      {isLoading || isFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem 10rem",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <section className="flex-col formContainer">
          <div className="grid grid-cols-4">
            <FieldView.Text
              value={data?.personNationalCode || "-"}
              label={NATIONAL_CODE}
            />
            <FieldView.Text
              value={data?.personnelID || "-"}
              label={PERSONNEL_NO}
            />
            <FieldView.Text
              value={data?.personFirstName || "-"}
              label={FIRST_NAME}
            />
            <FieldView.Text
              value={data?.personLastName || "-"}
              label={LAST_NAME}
            />
            <FieldView.Text
              value={data?.personCertificateNo || "-"}
              label={CERTIFICATE_NO}
            />
            <FieldView.Text
              value={data?.personFatherName || "-"}
              label={FATHER_NAME}
            />
            <FieldView.Text
              value={
                convertToPersianDateFormatted(data?.personBirthDate) || "-"
              }
              label={BIRTH_DATE}
            />
            <FieldView.Text
              value={data?.personBirthPlace || "-"}
              label={BIRTH_PLACE}
            />

            <FieldView.Text value={gender || "-"} label={GENDER} />

            <FieldView.Text value={marital || "-"} label={MARITIAL_STATUS} />
            <FieldView.Text
              value={data?.educationTypeCaption || "-"}
              label={EDUCATION_DEGREE}
            />

            <FieldView.Text
              value={data?.employmentDate || "-"}
              label={START_EMPLOYMENT_DATE}
            />

            {personDeathDate !== "null" && (
              <FieldView.Text
                value={convertToPersianDateFormatted(personDeathDate) || "-"}
                label={DEATH_DATE}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
  return content;
};
