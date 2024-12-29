// IMPORTS
import { useState, useEffect, useRef } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { StatementInfo, Amount, RetiredInfo } from "./types";
import { useGetRetirementStatementQuery } from "@/features/statement/statementApi";
import { useGetRetiredQuery } from "@/features/retired/retiredApi";
import { Table } from "../Table";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress } from "@mui/material";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import images from "@/constants/images";
import generatePDF, { Resolution } from "react-to-pdf";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import { separateByThousand } from "@/helpers/numberConverter";
import { checkboxKeys, editableItemIDs } from "./schema";
import { CustomModal } from "../CustomModal";
import useToggleState from "@/hooks/useToggleState";
import { EditStatementForm } from "./forms";
import {
  RETIREMENT_ORGANIZATION,
  IN_THE_NAME_OF_GOD,
  RETIREMENT_STATEMENT,
  PERSONS_UNDER_COVER,
  CURE_CODE,
  PERSONAL_INFO,
  PERSONNEL_INFO,
  RETIREMENT_YEARS,
  CAREER_TITLE,
  RELATED_INFO_TABLE,
  STATEMENT_ITEMS,
  TOTAL_AMOUNT,
} from "@/constants/consts/retired-statement";
import {
  STATEMENT_SERIAL,
  NATIONAL_CODE,
  FIRST_NAME,
  LAST_NAME,
  RETIRED_NO,
  CERTIFICATE_NO,
  FATHER_NAME,
  BIRTH_DATE,
  BIRTH_PLACE,
  GENDER,
  CHILDREN_NO,
  MARITIAL_STATUS,
  POSTAL_CODE,
  SACRIFICE_STATUS,
  SACRIFICED_FAMILY,
  VALIANT,
  CAPTIVE,
  WARRIOR,
  SACRIFICED,
  CHILD_OF_SACRIFICED,
  RETIREMENT_DATE,
  LAST_POSITION,
  LAST_ORGANIZATION,
  RETIRED_REAL_DURATION,
  RETIRED_GRANT_DURATION,
  PRINT,
  LEVEL,
  DAY,
  YEAR,
  MONTH,
  STATEMENT_TYPE,
  DEATH_DATE,
  EDIT,
  GROUP,
  EDUCATION_DEGREE,
  ROW_NO,
  RELATION,
  HEIR_SALARY,
  SUPPLEMENTARY_RETIREMENT,
  MARITIAL_RIGHT,
  CHILDREN_RIGHT,
  STATEMENT_DESC,
  RUN_DATE,
  ISSUE_NO,
  ISSUE_DATE,
  SIGNATURE,
} from "@/constants/const";

export const RetiredStatementDocument = () => {
  // STATES
  const downloadRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [openModal, toggleOpenModal] = useToggleState(false);
  const [foundItems, setFoundItems] = useState<Amount[]>([]);
  const [statementInfo, setStatementInfo] = useState<StatementInfo | null>(
    null
  );
  const [retiredInfo, setRetiredInfo] = useState<RetiredInfo | null>(null);
  const [signature, setSignature] = useState<string>("");
  const [canEdit, setCanEdit] = useState<boolean>(false);

  // CONSTS
  const statementID = searchParams.get("statementID");
  const personID = searchParams.get("personID");
  const personDeathDate = searchParams.get("personDeathDate");
  const { control, setValue } = useForm<FieldValues>();
  const {
    data: statement,
    isSuccess: isStatementSuccess,
    isLoading: isStatementLoading,
    isFetching: isStatementFetching,
    refetch: statementRefetch,
  } = useGetRetirementStatementQuery({ RetirementStatementID: statementID });
  const {
    data: retired,
    isSuccess: isRetiredSuccess,
    isLoading: isRetiredLoading,
    isFetching: isRetiredFetching,
  } = useGetRetiredQuery(personID);

  // HANDLERS
  useEffect(() => {
    if (isStatementSuccess) {
      setStatementInfo(statement);
      console.log(statement);
      setSignature(
        statement?.documentSignature ? statement.documentSignature : ""
      );

      const canEdit =
        !statement?.retirementStatementIssueConfirmDate &&
        statement?.retirementStatementAmountList?.some((item: Amount) =>
          editableItemIDs.includes(item.retirementStatementItemID)
        );

      setCanEdit(canEdit);

      if (canEdit) {
        const foundItems = statement.retirementStatementAmountList.filter(
          (item: Amount) =>
            editableItemIDs.includes(item.retirementStatementItemID)
        );

        console.log(foundItems);
        setFoundItems(foundItems);
        // setStatementEditableItemIDs(foundItems);
        // console.log(statementEditableItemIDs);
      }
    }
  }, [isStatementSuccess, statement]);

  useEffect(() => {
    if (isRetiredSuccess && retired.itemList.length > 0) {
      const data = retired.itemList[0];
      setRetiredInfo(data);

      Object.keys(data).forEach((key) => {
        if (checkboxKeys.includes(key)) {
          setValue(key, data[key]);
        }
      });
    }
  }, [isRetiredSuccess, retired, setValue]);

  // CONTENT
  const content = (
    <>
      <CustomModal title={EDIT} open={openModal} onClose={toggleOpenModal}>
        <EditStatementForm
          statementID={statementID}
          foundItems={foundItems}
          toggleModal={toggleOpenModal}
          refetch={statementRefetch}
        />
      </CustomModal>

      {isStatementLoading ||
      isStatementFetching ||
      isRetiredLoading ||
      isRetiredFetching ? (
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
            <div className="pdf-logo">
              <img src={images.documentLogo} className="pdf-logo--img" />
              <p className="pdf-logo--sub">{RETIREMENT_ORGANIZATION}</p>
            </div>

            <div className="pdf-qr">
              <div className="pdf-qr--box">QR CODE</div>

              <p className="pdf-qr--serial">
                {STATEMENT_SERIAL}:{" "}
                <span>{statementInfo?.retirementStatementSerial}</span>
              </p>
            </div>

            <div className="pdf-header">
              <h5>{IN_THE_NAME_OF_GOD}</h5>
              <h5>{RETIREMENT_STATEMENT}</h5>
            </div>

            {/* PERSON INFO TABLE */}
            <table className="pdf-person-info-table pdf-table">
              <thead>
                <Table.Header title={PERSONAL_INFO} colSpan={4} />
              </thead>
              <tbody>
                <Table.Row
                  columns={[
                    {
                      content: `${NATIONAL_CODE}: ${
                        retiredInfo?.personNationalCode ?? "-"
                      }`,
                    },
                    {
                      content: `${FIRST_NAME}: ${
                        retiredInfo?.personFirstName || "-"
                      }`,
                    },
                    {
                      content: `${LAST_NAME}: ${
                        retiredInfo?.personLastName || "-"
                      }`,
                    },
                    {
                      content: `${RETIRED_NO}: ${
                        retiredInfo?.retiredID ?? "-"
                      }`,
                    },
                  ]}
                />
                <Table.Row
                  columns={[
                    {
                      content: `${CERTIFICATE_NO}: ${
                        retiredInfo?.personCertificateNo ?? "-"
                      }`,
                    },
                    {
                      content: `${FATHER_NAME}: ${
                        retiredInfo?.personFatherName || "-"
                      }`,
                    },
                    {
                      content: `${BIRTH_DATE}: ${
                        convertToPersianDateFormatted(
                          retiredInfo?.personBirthDate
                        ) || "-"
                      }`,
                    },
                    {
                      content: `${BIRTH_PLACE}: ${
                        retiredInfo?.personBirthPlace || "-"
                      }`,
                    },
                  ]}
                />
                <Table.Row
                  columns={[
                    {
                      content: `${GENDER}: ${retiredInfo?.genderName || "-"}`,
                    },
                    {
                      content: `${CHILDREN_NO}: ${
                        statementInfo?.retirementStatementChildrenCount ?? "-"
                      }`,
                    },
                    {
                      content: `${PERSONS_UNDER_COVER}: ${
                        statementInfo?.retirementStatementRelatedCount ?? "-"
                      }`,
                    },
                    {
                      content: `${CURE_CODE}: ${
                        retiredInfo?.insuranceCode ?? "-"
                      }`,
                    },
                  ]}
                />
                <Table.Row
                  columns={[
                    {
                      content: `${MARITIAL_STATUS}: ${
                        retiredInfo?.maritalStatusName || "-"
                      }`,
                    },
                    {
                      content: `${POSTAL_CODE}: ${
                        retiredInfo?.personPostalCode ?? "-"
                      }`,
                      colSpan: 3,
                    },
                  ]}
                />

                <tr>
                  <td colSpan={4}>
                    <Table.CheckBoxGroup
                      control={control}
                      title={SACRIFICE_STATUS}
                      checkboxes={[
                        {
                          name: "personIsSacrificedFamily",
                          label: SACRIFICED_FAMILY,
                          disabled: true,
                        },
                        {
                          name: "personIsValiant",
                          label: VALIANT,
                          disabled: true,
                        },
                        {
                          name: "personIsCaptive",
                          label: CAPTIVE,
                          disabled: true,
                        },
                        {
                          name: "personIsWarrior",
                          label: WARRIOR,
                          disabled: true,
                        },
                        {
                          name: "personIsSacrificed",
                          label: SACRIFICED,
                          disabled: true,
                        },
                        {
                          name: "personIsChildOfSacrificed",
                          label: CHILD_OF_SACRIFICED,
                          disabled: true,
                        },
                      ]}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* PERSONNEL INFO TABLE */}
            <table className="pdf-personnel-info-table pdf-table">
              <thead>
                <Table.Header title={PERSONNEL_INFO} colSpan={3} />
              </thead>

              <tbody>
                <Table.Row
                  columns={[
                    {
                      content: `${RETIREMENT_DATE}: ${
                        convertToPersianDateFormatted(
                          retiredInfo?.retirementDate
                        ) || "-"
                      }`,
                    },
                    {
                      content: `${LAST_POSITION}: ${
                        retiredInfo?.retiredLastPosition || "-"
                      }`,
                    },
                    {
                      content: `${LAST_ORGANIZATION}: ${
                        retiredInfo?.retiredOrganizationName || "-"
                      }`,
                    },
                  ]}
                />

                <Table.Row
                  columns={[
                    {
                      content: `${RETIRED_REAL_DURATION}: ${DAY} : ${
                        retiredInfo?.retiredRealDurationDAY || "-"
                      } ${MONTH} : ${
                        retiredInfo?.retiredRealDurationMONTH || "-"
                      } ${YEAR} : ${
                        retiredInfo?.retiredRealDurationYEAR || "-"
                      }`,
                    },
                    {
                      content: `${RETIRED_GRANT_DURATION}: ${
                        retiredInfo?.retiredGrantDuration || "-"
                      }`,
                    },
                    {
                      content: `${RETIREMENT_YEARS}: -`,
                    },
                  ]}
                />

                <Table.Row
                  columns={[
                    {
                      content: `${GROUP}: ${
                        statementInfo?.retiredGroup || "-"
                      }`,
                    },
                    {
                      content: `${LEVEL}: ${
                        retiredInfo?.retiredJobDegree || "-"
                      }`,
                    },
                    {
                      content: `${EDUCATION_DEGREE}: ${
                        retiredInfo?.educationTypeName || "-"
                      }`,
                    },
                  ]}
                />

                <Table.Row
                  columns={[
                    {
                      content: `${STATEMENT_TYPE}: ${
                        statementInfo?.retirementStatementTypeName || "-"
                      }`,
                    },
                    {
                      content: `${CAREER_TITLE}: -`,
                    },
                    {
                      content: `${DEATH_DATE}: ${
                        convertToPersianDateFormatted(
                          retiredInfo?.personDeathDate
                        ) || "-"
                      }`,
                    },
                  ]}
                />
              </tbody>
            </table>

            {/**
             * render heir or related
             * tables based on person death date
             */}

            {personDeathDate !== "null" ? (
              <table className="pdf-related-table pdf-table">
                <thead>
                  <Table.Header colSpan={11} title={RELATED_INFO_TABLE} />
                  <Table.HeadRow
                    cells={[
                      { title: ROW_NO, width: "10px" },
                      { title: NATIONAL_CODE },
                      { title: FIRST_NAME },
                      { title: LAST_NAME },
                      { title: FATHER_NAME },
                      { title: RELATION },
                      { title: BIRTH_DATE },
                      { title: HEIR_SALARY },
                      { title: SUPPLEMENTARY_RETIREMENT },
                      { title: MARITIAL_RIGHT },
                      { title: CHILDREN_RIGHT },
                    ]}
                  />
                </thead>

                <tbody>
                  {statementInfo?.retirementStatementRelatedList?.map(
                    (item, index) => (
                      <Table.Row
                        key={index}
                        columns={[
                          {
                            content: `${index + 1}`,
                          },
                          {
                            content: `${item.personNationalCode || "-"}`,
                          },
                          {
                            content: `${item.personFirstName || "-"}`,
                          },
                          {
                            content: `${item.personLastName || "-"}`,
                          },
                          {
                            content: `${item.personFatherName || "-"}`,
                          },
                          {
                            content: `${
                              item.relationshipWithParentName || "-"
                            }`,
                          },
                          {
                            content: `${
                              convertToPersianDateFormatted(
                                item.personBirthDate
                              ) || "-"
                            }`,
                          },
                          {
                            content: `${
                              separateByThousand(item.heirRight) ?? "-"
                            }`,
                          },
                          {
                            content: `${
                              separateByThousand(item.supplementaryRight) ?? "-"
                            }`,
                          },
                          {
                            content: `${
                              separateByThousand(item.maritalRight) ?? "-"
                            }`,
                          },
                          {
                            content: `${
                              separateByThousand(item.childRight) ?? "-"
                            }`,
                          },
                        ]}
                      />
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <table className="pdf-related-table pdf-table">
                <thead>
                  <Table.Header colSpan={7} title={RELATED_INFO_TABLE} />
                  <Table.HeadRow
                    cells={[
                      {
                        title: ROW_NO,
                        width: "10px",
                      },
                      {
                        title: NATIONAL_CODE,
                      },
                      {
                        title: FIRST_NAME,
                      },
                      {
                        title: LAST_NAME,
                      },
                      {
                        title: FATHER_NAME,
                      },
                      {
                        title: RELATION,
                      },
                      {
                        title: BIRTH_DATE,
                      },
                    ]}
                  />
                </thead>

                <tbody>
                  {statementInfo?.retirementStatementRelatedList?.map(
                    (item, index) => (
                      <Table.Row
                        key={index}
                        columns={[
                          {
                            content: `${index + 1}`,
                          },
                          {
                            content: `${item.personNationalCode || "-"}`,
                          },
                          {
                            content: `${item.personFirstName || "-"}`,
                          },
                          {
                            content: `${item.personLastName || "-"}`,
                          },
                          {
                            content: `${item.personFatherName || "-"}`,
                          },
                          {
                            content: `${
                              item.relationshipWithParentName || "-"
                            }`,
                          },
                          {
                            content: `${
                              convertToPersianDateFormatted(
                                item.personBirthDate
                              ) || "-"
                            }`,
                          },
                        ]}
                      />
                    )
                  )}
                </tbody>
              </table>
            )}

            {/* STATEMENT ITEMS  & DESC */}
            <div className="pdf-items-container">
              <table className="pdf-table">
                <thead>
                  <Table.Header title={STATEMENT_DESC} colSpan={1} />
                </thead>

                <tbody>
                  <tr>
                    <td style={{ verticalAlign: "top" }}>
                      {statementInfo?.retirementStatementDesc || "-"}
                    </td>
                  </tr>
                </tbody>
              </table>

              <table className="pdf-statement-items-table pdf-table">
                <thead>
                  <Table.Header title={STATEMENT_ITEMS} colSpan={2} />
                </thead>

                <tbody>
                  {statementInfo?.retirementStatementAmountList?.map(
                    (item, index) => (
                      <Table.Row
                        key={index}
                        columns={[
                          {
                            content: `${
                              item.retirementStatementItemName || "-"
                            }`,
                          },
                          {
                            content: `${
                              separateByThousand(
                                item.retirementStatementItemAmount
                              ) ?? "-"
                            }`,
                          },
                        ]}
                      />
                    )
                  )}
                </tbody>

                <tfoot>
                  <Table.Row
                    columns={[
                      {
                        content: `${TOTAL_AMOUNT} : ${
                          separateByThousand(
                            statementInfo?.sumRetirementStatementAmount
                          ) ?? "-"
                        }`,
                        colSpan: 2,
                      },
                    ]}
                  />
                </tfoot>
              </table>
            </div>

            {/* FOOTER */}
            <table className="pdf-statement-footer-table pdf-table">
              <thead>
                <Table.Row
                  columns={[
                    {
                      content: `${RUN_DATE} : ${
                        convertToPersianDateFormatted(
                          statementInfo?.retirementStatementRunDate
                        ) || "-"
                      }`,
                    },
                    {
                      content: `${ISSUE_DATE} : ${
                        convertToPersianDateFormatted(
                          statementInfo?.retirementStatementIssueDate
                        ) || "-"
                      }`,
                    },
                    {
                      content: `${ISSUE_NO} : ${
                        statementInfo?.retirementStatementNo ?? "-"
                      }`,
                    },
                  ]}
                />
              </thead>

              <tbody>
                <tr>
                  <td
                    colSpan={3}
                    style={{ textAlign: "left", padding: "20px" }}
                  >
                    {signature && (
                      <img
                        src={signature}
                        alt={SIGNATURE}
                        className="w-[120px] mr-auto"
                      />
                    )}
                    عضو هیات مدیره و مدیرعامل
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex-row mr-auto px-40 mt-10">
            <LoadingButton
              dir="ltr"
              endIcon={<DownloadIcon />}
              onClick={() =>
                generatePDF(downloadRef, {
                  filename: "حکم بازنشستگی.pdf",
                  resolution: Resolution.HIGH,
                })
              }
              variant="contained"
              color="primary"
            >
              <span>{PRINT}</span>
            </LoadingButton>

            <LoadingButton
              dir="ltr"
              endIcon={<EditIcon />}
              variant="contained"
              color="primary"
              disabled={!canEdit}
              onClick={toggleOpenModal}
            >
              <span>{EDIT}</span>
            </LoadingButton>
          </div>
        </section>
      )}
    </>
  );

  return content;
};
