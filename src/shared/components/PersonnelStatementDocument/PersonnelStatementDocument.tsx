// IMPORTS
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
// import { Table } from "../Table";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";

import generatePDF, { Resolution } from "react-to-pdf";
import { Box, CircularProgress, Checkbox } from "@mui/material";
import { useGetPersonnelStatementDetailQuery } from "@/features/personnel/personnelApi";
import { useGetPersonsQuery } from "@/features/person/personApi";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import { LoadingButton } from "@mui/lab";
import {
  PersonnelStatementType,
  PersonnelPersonType,
  PersonnelSanavatType,
  PersonnelStatementItem,
} from "./types";
import { separateByThousand } from "@/helpers/numberConverter";
import { PRINT } from "@/constants/const";
// import {
//   EMPLOYEE_NUMBER,
//   EDUCATION_LEVEL,
//   EDUCATION_FILED,
//   EDUCATION_TENDENCY,
// } from "@/constants/consts/personnel-statement";
// import {
//   RECRUITING_STATEMENT,
//   TEHRAN_MUNICIPALITY,
//   STATEMENT_SERIAL,
//   NATIONAL_CODE,
//   POSTAL_CODE,
//   FIRST_NAME,
//   LAST_NAME,
//   FATHER_NAME,
//   CERTIFICATE_NO,
//   ISSUE_PLACE,
//   STATE,
//   BIRTH_DATE,
//   BIRTH_PLACE,
//   YEAR,
//   MONTH,
//   DAY,
// } from "@/constants/const";

export const PersonnelStatementDocument = () => {
  // STATES
  const downloadRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [statementData, setStatementData] =
    useState<PersonnelStatementType | null>(null);
  const [personData, setPersonData] = useState<PersonnelPersonType | null>(
    null
  );
  const [birthDate, setBirthDate] = useState<string[]>([]);
  const [acceptedSanavat, setAcceptedSanavat] = useState<
    PersonnelSanavatType[]
  >([]);
  const [itemList, setItemList] = useState<PersonnelStatementItem[]>([]);

  // CONSTS
  const personID = searchParams.get("personID");
  const statementID = searchParams.get("statementID");
  const {
    data: statement,
    isSuccess: isStatementSuccess,
    isLoading: isStatementLoading,
    isFetching: isStatementFetching,
  } = useGetPersonnelStatementDetailQuery({
    personnelStatementID: statementID,
  });

  const {
    data: person,
    isSuccess: isPersonSuccess,
    isLoading: isPersonLoading,
    isFetching: isPersonFetching,
  } = useGetPersonsQuery({ personID });

  // HANDLERS
  useEffect(() => {
    if (isStatementSuccess) {
      const clearedSanavat = statement?.itemList[0]?.retiredRecorded1.trim();
      const sanavat = clearedSanavat.match(/.{1,2}/g);
      setAcceptedSanavat(sanavat);
      setStatementData(statement.itemList[0]);
      setItemList(statement.itemList[0].personnelStatementItems);
    }
  }, [isStatementSuccess, statement]);

  useEffect(() => {
    if (isPersonSuccess) {
      setPersonData(person.itemList[0]);
      const date = convertToPersianDateFormatted(
        person.itemList[0].personBirthDate
      ).split("/");
      setBirthDate(date);
    }
  }, [isPersonSuccess, person]);

  // CONTENT
  const content = (
    <>
      {isStatementLoading ||
      isStatementFetching ||
      isPersonLoading ||
      isPersonFetching ||
      statementData === null ||
      personData === null ? (
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
        <section className="pdf-container">
          <div className="pdf" ref={downloadRef}>
            <div className="slip-container__personnel-statement-header">
              <p className="slip-container__logo--sub">شهرداری تهران</p>

              <h5>حکم کارگزینی</h5>
              <p className="slip-container__qr--serial">
                شماره سریال :
                <span>{statementData?.personnelStatementSerial || "-"}</span>
              </p>
            </div>

            {/* MAIN INFO TABLE */}
            <table className="pdf-personnel-statement-table pdf-table">
              <thead>
                <tr>
                  <th className="no-border-left">۱- شماره مستخدم : </th>
                  <th className="no-border-right">
                    {statementData?.personnelID}
                  </th>
                  <th className="no-border-left">۲- شماره ملی : </th>

                  <th className="no-border-right">
                    {personData?.personNationalCode || "-"}
                  </th>
                  <th className="no-border-left">۳- کد پستی :</th>
                  <th className="no-border-right">
                    {personData?.personPostalCode || "-"}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="no-border-left">۴- نام :</td>
                  <td className="no-border-right">
                    {personData?.personFirstName}
                  </td>
                  <td className="no-border-left">۵- نام خانوادگی :</td>
                  <td className="no-border-right">
                    {personData?.personLastName}
                  </td>
                  <td className="no-border-left">۶- نام پدر :</td>
                  <td className="no-border-right">
                    {personData?.personFatherName}
                  </td>
                </tr>

                <tr>
                  <td className="no-border-left">۷- شماره شناسنامه :</td>
                  <td className="no-border-right">
                    {personData?.personCertificateNo || "-"}
                  </td>
                  <td className="no-border-left">۸- محل صدور :</td>
                  <td className="no-border-right"></td>
                  <td className="no-border-left">۹- استان :</td>
                  <td className="no-border-right"></td>
                </tr>

                <tr>
                  <td className="no-border-left no-border-bottom" colSpan={2}>
                    ۱۰- تاریخ و محل تولد :
                  </td>
                  <td className="no-border-right no-border-bottom">
                    {statementData?.personBirthPlace}
                  </td>
                  <td className="no-border-bottom" colSpan={3}>
                    ۱۱- بالاترین مدرک و رشته تحصیلی‌ :
                  </td>
                </tr>

                <tr>
                  <td className="no-border-top no-border-left">
                    روز : {birthDate[2]}
                  </td>
                  <td className="no-border-top no-border-right no-border-left">
                    ماه : {birthDate[1]}
                  </td>
                  <td className="no-border-top no-border-right">
                    سال : {birthDate[0]}
                  </td>

                  <td className="no-border-top no-border-left">
                    مقطع تحصیلی : {statementData?.educationLicence || "-"}
                  </td>
                  <td className="no-border-top no-border-right no-border-left">
                    رشته : {statementData?.eduBranch || "-"}
                  </td>
                  <td className="no-border-top no-border-right">
                    گرایش : {statementData?.eduBranchArea || "-"}
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} className="no-border-left">
                    ۱۲- عنوان پست سازمانی :
                  </td>
                  <td className="no-border-right no-border-left">
                    {statementData?.positionName || "-"}
                  </td>
                  <td className="no-border-right"></td>

                  <td className="no-border-left">شماره پست :</td>
                  <td className="no-border-right">
                    {statementData?.positionCode || "-"}{" "}
                  </td>
                </tr>

                <tr>
                  <td className="no-border-left" colSpan={2}>
                    ۱۳- رسته :
                  </td>

                  <td className="no-border-left" colSpan={2}>
                    رشته و طبفه شغلی : {statementData?.jobName}
                  </td>

                  <td>کد شغل : {statementData?.jobCode || "-"}</td>
                  <td>مرتبه : {statementData?.jobDegree1 || "-"}</td>
                </tr>

                <tr>
                  <td>۱۴- گروه :</td>
                  <td colSpan={3} className="no-border-left">
                    ۱۵- سنوات فابل قبول از نظر بازنشستگی : <br />
                    <div className="w-full flex justify-between items-center px-10 mt-1">
                      <span>روز : {acceptedSanavat[2]}</span>

                      <span>ماه : {acceptedSanavat[1]}</span>

                      <span>سال : {acceptedSanavat[0]}</span>
                    </div>
                  </td>

                  <td colSpan={2}>
                    صندوق بازنشستگی : {statementData?.payLocation}
                  </td>
                </tr>

                <tr>
                  <td colSpan={6}>
                    <div className="slip-container__person-info-table--checkbox">
                      <span>۱۶- وضعیت ایثارگری :</span>
                      <div>
                        <Checkbox
                          size="small"
                          color="success"
                          name="personIsSacrificedFamily"
                          id="personIsSacrificedFamily"
                          // checked={}
                          disabled
                          sx={{
                            padding: 0.5,
                          }}
                        />
                        <label htmlFor="personIsSacrificedFamily">
                          خانواده شهید
                        </label>
                      </div>

                      <div>
                        <Checkbox
                          size="small"
                          color="success"
                          name="personIsValiant"
                          id="personIsValiant"
                          disabled
                          sx={{
                            padding: 0.5,
                          }}
                        />
                        <label htmlFor="personIsValiant">جانباز</label>
                      </div>

                      <div>
                        <Checkbox
                          size="small"
                          color="success"
                          name="personIsCaptive"
                          disabled
                          checked={personData?.isCaptivity}
                          id="personIsCaptive"
                          sx={{
                            padding: 0.5,
                          }}
                        />
                        <label htmlFor="personIsCaptive">آزاده</label>
                      </div>

                      <div>
                        <Checkbox
                          size="small"
                          color="success"
                          disabled
                          name="personIsWarrior"
                          id="personIsWarrior"
                          checked={personData?.isWar}
                          sx={{
                            padding: 0.5,
                          }}
                        />
                        <label htmlFor="personIsWarrior">رزمنده</label>
                      </div>

                      <div>
                        <Checkbox
                          size="small"
                          color="success"
                          name="personIsSacrificed"
                          disabled
                          checked={personData?.isMartyrs}
                          id="personIsSacrificed"
                          sx={{
                            padding: 0.5,
                          }}
                        />
                        <label htmlFor="personIsSacrificed">سایر</label>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colSpan={3}>
                    ۱۷- واحد سازمانی : {statementData?.organizationUnit}
                  </td>
                  <td colSpan={3}>
                    ۱۸- محل خدمت : {statementData?.workPlace || "-"}
                  </td>
                </tr>

                <tr>
                  <td className="no-border-left">۱۹- وضعیت تاهل :</td>
                  <td className="no-border-right">
                    {statementData?.maritalStatusIDName}
                  </td>
                  <td>تعداد فرزندان : {statementData?.childCount}</td>

                  <td colSpan={3}>۲۰- ضریب افزایش سنواتی :</td>
                </tr>

                <tr>
                  <th colSpan={3}>
                    ۲۱- نوع حکم : {statementData?.orderType || "-"}
                  </th>
                  <th colSpan={3}>حقوق و فوق العاده ها به ریال :</th>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-center items-start w-full gap-x-1">
              <div className="flex flex-col w-full">
                <table className="pdf-personnel-statement-table pdf-table">
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: "top" }}>۲۲- شرح حکم :</td>
                    </tr>

                    <tr>
                      <td>{statementData?.description || "-"}</td>
                    </tr>
                  </tbody>
                </table>

                <table className="pdf-personnel-statement-table pdf-table">
                  <tbody>
                    <tr>
                      <td>
                        ۲۳ - تاریخ اجرای حکم :{" "}
                        {convertToPersianDateFormatted(
                          statementData?.personnelStatementRunDate
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>ﺷﻤﺎﺭﻩ ﺣﮑﻢ : {statementData?.code}</td>
                    </tr>

                    <tr>
                      <td>
                        ۲۴- ﺗﺎﺭﯾﺦ ﺻﺪﻭﺭ ﺣﮑﻢ :{" "}
                        {convertToPersianDateFormatted(
                          statementData?.registerDate
                        ) || "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <table className="pdf-personnel-statement-table form-table">
                <tbody>
                  {itemList?.map((item, index) => (
                    <tr key={index}>
                      <td style={{ verticalAlign: "top" }}>
                        {item.personnelStatementItemTypeName}
                      </td>
                      <td className="text-center">
                        {separateByThousand(item.personnelStatementItemAmount)}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-[800]">
                    <td>جمع مشمول کسور</td>
                    <td className="text-center">
                      {separateByThousand(statementData?.fractionBaseAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <table className="pdf-personnel-statement-table pdf-table">
              <tbody>
                <tr>
                  <th colSpan={6}>۲۵- ﺟﻤﻊ ﺣﻘﻮﻕ ﻭ ﻣﺰﺍﯾﺎ ﺑﻪ ﺣﺮﻭﻑ :</th>
                </tr>

                <tr>
                  <td colSpan={3} className="no-border-bottom">
                    ۲۶- ﻧﺎﻡ ﻭ ﻧﺎﻡ ﺧﺎﻧﻮﺍﺩﮔﯽ ﻣﻘﺎﻡ ﻣﺴﺌﻮﻝ :
                  </td>
                  <td colSpan={3} className="no-border-bottom">
                    ﻧﺴﺨﻪ ﻣﺮﺑﻮﻁ ﺑﻪ :
                  </td>
                </tr>

                <tr>
                  <td colSpan={3} className="no-border-top">
                    ﻋﻨﻮﺍﻥ ﭘﺴﺖ ﺛﺎﺑﺖ ﺳﺎﺯﻣﺎﻧﯽ :
                  </td>
                  <td
                    colSpan={3}
                    style={{ justifyContent: "center", textAlign: "center" }}
                    className="no-border-top"
                  ></td>
                </tr>
              </tbody>
            </table>

            <p
              style={{
                textAlign: "right",
                fontSize: "12px",
                justifyContent: "right",
                width: "100%",
              }}
            >
              ﮐﺎﺭﺑﺮ :
            </p>
          </div>

          <div className="flex-row mr-auto ml-60 mt-10">
            <LoadingButton
              dir="ltr"
              endIcon={<DownloadIcon />}
              onClick={() =>
                generatePDF(downloadRef, {
                  filename: "حکم کارمندی.pdf",
                  resolution: Resolution.HIGH,
                })
              }
              variant="contained"
              color="primary"
              sx={{ fontFamily: "IranYekan" }}
            >
              <span>{PRINT}</span>
            </LoadingButton>
          </div>
        </section>
        // <section className="pdf-container">
        //   <div className="pdf" ref={downloadRef}>
        //     <div className="pdf-personnel-statement-header">
        //       <p className="pdf-logo--sub">{TEHRAN_MUNICIPALITY}</p>

        //       <h5>{RECRUITING_STATEMENT}</h5>

        //       <p className="pdf-qr--serial">
        //         {STATEMENT_SERIAL}:{" "}
        //         <span>{statementData?.personnelStatementSerial || "-"}</span>
        //       </p>
        //     </div>

        //     {/* MAIN INFO TABLE */}
        //     <table className="pdf-personnel-statement-table pdf-table">
        //       <thead>
        //         <Table.HeadRowRight
        //           cells={[
        //             {
        //               title: `۱ - ${EMPLOYEE_NUMBER} : ${
        //                 statementData?.personnelID || "-"
        //               }`,
        //             },
        //             {
        //               title: `۲ - ${NATIONAL_CODE} : ${
        //                 personData?.personNationalCode || "-"
        //               }`,
        //             },
        //             {
        //               title: `۳ - ${POSTAL_CODE} : ${
        //                 personData?.personPostalCode || "-"
        //               }`,
        //             },
        //           ]}
        //         />
        //       </thead>

        //       <tbody>
        //         <Table.Row
        //           columns={[
        //             {
        //               content: `۴ -  ${FIRST_NAME} : ${
        //                 personData?.personFirstName || "-"
        //               }`,
        //             },
        //             {
        //               content: `۵ -  ${LAST_NAME} : ${
        //                 personData?.personLastName || "-"
        //               }`,
        //             },
        //             {
        //               content: `۶ -  ${FATHER_NAME} : ${
        //                 personData?.personFatherName || "-"
        //               }`,
        //             },
        //           ]}
        //         />

        //         <Table.Row
        //           columns={[
        //             {
        //               content: `۷ -  ${CERTIFICATE_NO} : ${
        //                 personData?.personCertificateNo || "-"
        //               }`,
        //             },
        //             {
        //               content: `۸ -  ${ISSUE_PLACE} : ${"-"}`,
        //             },
        //             {
        //               content: `۹ -  ${STATE} : ${"-"}`,
        //             },
        //           ]}
        //         />
        //       </tbody>
        //     </table>
        //   </div>
        // </section>
      )}
    </>
  );
  return content;
};
