// IMPORTS
import { useState, useEffect, useRef } from "react";
import { Box, CircularProgress, Button, Checkbox } from "@mui/material";
import { DownloadOutlined as DownloadIcon } from "@mui/icons-material";
import { useGetPersonnelStatementDetailQuery } from "@/features/personnel/personnelApi";
import { useGetPersonsQuery } from "@/features/person/personApi";
import {
  convertToPersianNumber,
  separateByThousands,
  convertToPersianDateFormatted,
} from "../helper";
import { NumberHelper } from "@/helpers/numberConverter";
import generatePDF from "react-to-pdf";
import Modal from "./Modal";

function PersonnelStatementTemplate({ statementID }) {
  // DOWNLOAD REF
  const targetRef = useRef();

  const searchParams = new URLSearchParams(location.search);
  const personID = searchParams.get("personID");

  // MAIN STATE
  const [statementData, setStatementData] = useState(null);
  const [personData, setPersonData] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [birthDate, setBirthDate] = useState([]);
  const [acceptedSanavat, setAcceptedSanavat] = useState([]);

  // GET DATA
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

  // FETCH DATA
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

  const content = (
    <>
      {isStatementLoading ||
      isStatementFetching ||
      isPersonLoading ||
      isPersonFetching ||
      statementData === null ||
      personData === null ? (
        <Modal title={"در حال بارگذاری..."}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "2rem 10rem",
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        </Modal>
      ) : (
        <div className="slip-container">
          {/* HEADER */}

          <div className="slip-container" ref={targetRef}>
            <div className="slip-container__personnel-statement-header">
              <p className="slip-container__logo--sub">شهرداری تهران</p>

              <h5>حکم کارگزینی</h5>
              <p className="slip-container__qr--serial">
                شماره سریال :
                <span>
                  {convertToPersianNumber(
                    statementData?.personnelStatementSerial
                  ) || "-"}
                </span>
              </p>
            </div>

            {/* MAIN INFO TABLE */}
            <table className="slip-container__personnel-statement-table form-table">
              <thead>
                <tr>
                  <th className="no-border-left">۱- شماره مستخدم : </th>
                  <th className="no-border-right">
                    {convertToPersianNumber(statementData?.personnelID)}
                  </th>
                  <th className="no-border-left">۲- شماره ملی : </th>

                  <th className="no-border-right">
                    {convertToPersianNumber(personData?.personNationalCode) ||
                      "-"}
                  </th>
                  <th className="no-border-left">۳- کد پستی :</th>
                  <th className="no-border-right">
                    {convertToPersianNumber(personData?.personPostalCode) ||
                      "-"}
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
                    {convertToPersianNumber(personData?.personCertificateNo) ||
                      "-"}
                  </td>
                  <td className="no-border-left">۸- محل صدور :‌</td>
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
                    {convertToPersianNumber(statementData?.positionCode) || "-"}{" "}
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
                      <span>
                        روز : {convertToPersianNumber(acceptedSanavat[2])}
                      </span>

                      <span>
                        ماه : {convertToPersianNumber(acceptedSanavat[1])}
                      </span>

                      <span>
                        سال : {convertToPersianNumber(acceptedSanavat[0])}
                      </span>
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
                  <td>
                    تعداد فرزندان :{" "}
                    {convertToPersianNumber(statementData?.childCount)}
                  </td>

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
                <table className="slip-container__personnel-statement-table form-table">
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: "top" }}>۲۲- شرح حکم :</td>
                    </tr>

                    <tr>
                      <td>{statementData?.description || "-"}</td>
                    </tr>
                  </tbody>
                </table>

                <table className="slip-container__personnel-statement-table form-table">
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
                      <td>
                        ﺷﻤﺎﺭﻩ ﺣﮑﻢ :{" "}
                        {convertToPersianNumber(statementData?.code)}
                      </td>
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

              <table className="slip-container__personnel-statement-table form-table">
                <tbody>
                  {itemList?.map((item, index) => {
                    const helper = new NumberHelper(
                      item.personnelStatementItemAmount.toString()
                    );
                    const separatedNum = helper.toSeparated();
                    return (
                      <tr key={index}>
                        <td style={{ verticalAlign: "top" }}>
                          {item.personnelStatementItemTypeName}
                        </td>
                        <td className="text-center">{separatedNum}</td>
                      </tr>
                    );
                  })}
                  <tr className="font-bold">
                    <td>جمع مشمول کسور</td>
                    <td className="text-center">
                      {separateByThousands(
                        convertToPersianNumber(
                          statementData?.fractionBaseAmount
                        )
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <table className="slip-container__personnel-statement-table form-table">
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

          <div style={{ marginRight: "auto" }}>
            <Button
              dir="ltr"
              endIcon={<DownloadIcon />}
              onClick={() =>
                generatePDF(targetRef, { filename: "حکم کارمندی.pdf" })
              }
              variant="contained"
              color="primary"
              sx={{ fontFamily: "IranYekan" }}
            >
              <span>دانلود حکم</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );

  return content;
}

export default PersonnelStatementTemplate;
