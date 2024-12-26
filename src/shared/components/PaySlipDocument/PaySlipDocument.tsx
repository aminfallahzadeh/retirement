// IMPORTS
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetPayQuery } from "@/features/pay/payApi";
import generatePDF, { Resolution } from "react-to-pdf";
import { Table } from "../Table";
import { LoadingButton } from "@mui/lab";
import { Box, CircularProgress } from "@mui/material";
import { SlipInfo, PayItem } from "./types";
import DownloadIcon from "@mui/icons-material/DownloadOutlined";
import images from "@/constants/images";
import {
  separateByThousand,
  convertToPersianWords,
} from "@/helpers/numberConverter";
import {
  RETIREMENT_ORGANIZATION,
  IN_THE_NAME_OF_GOD,
} from "@/constants/consts/retired-statement";
import {
  PAYSLIP,
  FIRST_NAME,
  LAST_NAME,
  EMPLOYMENT_TYPE,
  PERIOD,
  BANK,
  BANK_BRANCH,
  ACCOUNT_NO,
  PRINT,
  ROW_NO,
  SALARY_AND_BENEFITS,
  AMOUNT,
  FRACTION,
  ORIGINAL_LOAN,
  AMOUNT_IN_RIALS,
  REMAINING,
  TOTAL,
  PAYMENT_TOTAL,
} from "@/constants/const";

export const PaySlipDocument = () => {
  // STATES
  const downloadRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [slipInfo, setSlipInfo] = useState<SlipInfo | null>(null);
  const [positiveItems, setPositiveItems] = useState<PayItem[]>([]);
  const [negativeItems, setNegativeItems] = useState<PayItem[]>([]);
  const [positiveSum, setPositiveSum] = useState<number>(0);
  const [negativeSum, setNegativeSum] = useState<number>(0);

  // CONSTS
  const payID = searchParams.get("payID");
  const { data, isLoading, isFetching, isSuccess } = useGetPayQuery({ payID });

  // HANDLERS
  useEffect(() => {
    if (isSuccess) {
      setSlipInfo(data);
    }
    if (data?.payItemList) {
      const negative = data.payItemList.filter(
        (item: PayItem) => item.payItemAmount < 0
      );

      const positive = data.payItemList.filter(
        (item: PayItem) => item.payItemAmount >= 0
      );

      // CALCULATE SUMS
      const negativeSum = negative.reduce(
        (sum: number, item: PayItem) => sum + item.payItemAmount,
        0
      );
      const positiveSum = positive.reduce(
        (sum: number, item: PayItem) => sum + item.payItemAmount,
        0
      );

      // UPDATE STATE
      setNegativeItems(negative);
      setPositiveItems(positive);
      setNegativeSum(negativeSum);
      setPositiveSum(positiveSum);
    }
  }, [isSuccess, data]);

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
        <section className="pdf-container">
          <div className="pdf" ref={downloadRef}>
            <div className="pdf-logo">
              <img src={images.documentLogo} className="pdf-logo--img" />
              <p className="pdf-logo--sub">{RETIREMENT_ORGANIZATION}</p>
            </div>

            <div className="pdf-header">
              <h5>{IN_THE_NAME_OF_GOD}</h5>
              <h5>{PAYSLIP}</h5>
            </div>

            {/* SLIP INFO TABLE */}
            <table className="pdf-green-table pdf-table mt-5">
              <tbody>
                <Table.Row
                  columns={[
                    {
                      content: `${FIRST_NAME}: ${
                        slipInfo?.personFirstName || "-"
                      }`,
                    },
                    {
                      content: `${LAST_NAME}: ${
                        slipInfo?.personLastName || "-"
                      }`,
                    },
                    {
                      content: `${PERIOD}: ${slipInfo?.currentYear || "-"}/${
                        slipInfo?.currentMonth || "-"
                      } `,
                      colSpan: 2,
                    },
                  ]}
                />

                <Table.Row
                  columns={[
                    {
                      content: `${EMPLOYMENT_TYPE}: ${
                        slipInfo?.personEmploymentTypeName || "-"
                      }`,
                    },
                    {
                      content: `${BANK}: ${slipInfo?.personBankName || "-"}`,
                    },
                    {
                      content: `${BANK_BRANCH}: ${
                        slipInfo?.personBankBranchName || "-"
                      }`,
                    },
                    {
                      content: `${ACCOUNT_NO}: ${
                        slipInfo?.personAccount || "-"
                      }`,
                    },
                  ]}
                />
              </tbody>
            </table>

            {/* SLIPS ITEMS */}
            <div className="pdf-items-container text-center">
              <table className="pdf-table">
                <thead>
                  <Table.HeadRow
                    cells={[
                      { title: ROW_NO, width: "40px" },
                      { title: SALARY_AND_BENEFITS },
                      { title: AMOUNT },
                    ]}
                  />
                </thead>
                <tbody>
                  {positiveItems.map((item: PayItem, index: number) => (
                    <Table.Row
                      key={index}
                      columns={[
                        {
                          content: `${index + 1}`,
                        },
                        {
                          content: `${item.payItemTypeName || "-"}`,
                        },
                        {
                          content: `${
                            separateByThousand(item.payItemAmount) || "-"
                          }`,
                        },
                      ]}
                    />
                  ))}
                </tbody>
              </table>

              <table className="pdf-table">
                <thead>
                  <Table.HeadRow
                    cells={[
                      {
                        title: ROW_NO,
                        width: "40px",
                      },
                      {
                        title: FRACTION,
                      },
                      {
                        title: AMOUNT_IN_RIALS,
                      },
                      {
                        title: REMAINING,
                      },
                      {
                        title: ORIGINAL_LOAN,
                      },
                    ]}
                  />
                </thead>

                <tbody>
                  {negativeItems.map((item: PayItem, index: number) => (
                    <Table.Row
                      key={index}
                      columns={[
                        {
                          content: `${index + 1}`,
                        },
                        {
                          content: `${item.payItemTypeName || "-"}`,
                        },
                        {
                          content: `${
                            separateByThousand(Math.abs(item.payItemAmount)) ||
                            "-"
                          }`,
                        },
                        {
                          content: `${
                            separateByThousand(item.remainedAmount) || "-"
                          }`,
                        },
                        {
                          content: `${item.financialItemAmount || "-"}`,
                        },
                      ]}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* TOTAL TABLE */}
            <div className="pdf-red-table">
              <table className="pdf-table">
                <tbody>
                  <Table.Row
                    columns={[
                      {
                        content: `${
                          TOTAL + " " + SALARY_AND_BENEFITS
                        }: ${separateByThousand(positiveSum)}`,
                      },

                      {
                        content: `${
                          TOTAL + " " + FRACTION
                        }: ${separateByThousand(Math.abs(negativeSum))}`,
                      },
                    ]}
                  />

                  <Table.Row
                    columns={[
                      {
                        content: `${PAYMENT_TOTAL}: ${separateByThousand(
                          slipInfo?.payAmount
                        )}`,
                        colSpan: 2,
                      },
                    ]}
                  />
                </tbody>
              </table>
            </div>

            <div className="slip-container__footer">
              <h5>مبلغ قابل پرداخت به حروف : </h5>
              <p style={{ fontSize: "12px" }}>
                {`${convertToPersianWords(slipInfo?.payAmount || "-")} ریال`}
              </p>
            </div>
          </div>

          <div className="flex-row mr-auto px-40 mt-10">
            <LoadingButton
              dir="ltr"
              endIcon={<DownloadIcon />}
              onClick={() =>
                generatePDF(downloadRef, {
                  filename: "فیش حقوقی.pdf",
                  resolution: Resolution.HIGH,
                })
              }
              variant="contained"
              color="primary"
            >
              <span>{PRINT}</span>
            </LoadingButton>
          </div>
        </section>
      )}
    </>
  );

  return content;
};
