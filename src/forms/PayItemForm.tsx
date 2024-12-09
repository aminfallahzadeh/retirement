// REACT IMPORTS
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// MUI

import { LoadingButton } from "@mui/lab";
import { Save as SaveIcon } from "@mui/icons-material";

// REDUX

// HELPERS
import { convertToPersianNumber, separateByThousands } from "../helper";

function PayItemForm({ isLoading }) {
  // ACCESS REACT HOOK FORM CONTROL
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm();

  // DEBUGGING
  const onSubmit = (data) => {
    console.log(data);
  };

  // ACCESS FORM DATA
  const form_data = watch();

  // FETCH DATA FUNCTION

  useEffect(() => {
    console.log(form_data);
  }, [form_data]);

  const content = (
    <>
      {isLoading ? (
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
        <section className="formContainer-transparent formContainer--width-lg flex-col">
          <form
            method="POST"
            className="flex-col"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid grid--col-3">
              <div className="inputBox__form">
                {errors.payItemTypeID && (
                  <span className="error-form">
                    {errors.payItemTypeID.message}
                  </span>
                )}
                <input
                  type="text"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.payItemTypeID) || ""}
                  name="payItemTypeID"
                  id="payItemTypeID"
                  required
                  {...register("payItemTypeID", {
                    required: "شناسه آیتم اجباری است",
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "شناسه فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="payItemTypeID"
                >
                  <span>*</span> شناسه آیتم
                </label>
              </div>

              <div className="inputBox__form">
                {errors.payItemTypeName && (
                  <span className="error-form">
                    {errors.payItemTypeName.message}
                  </span>
                )}
                <input
                  type="text"
                  className="inputBox__form--input"
                  value={form_data?.payItemTypeName || ""}
                  name="payItemTypeName"
                  id="payItemTypeName"
                  required
                  {...register("payItemTypeName", {
                    required: "شرح آیتم اجباری است",
                    pattern: {
                      value: /^[آ-ی\s۰-۹]+$/,
                      message: "از حروف و اعداد فارسی استفاده کنید",
                    },
                  })}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="payItemTypeName"
                >
                  <span>*</span> شرح آیتم
                </label>
              </div>

              <div className="inputBox__form">
                {errors.financialItemAmount && (
                  <span className="error-form">
                    {errors.financialItemAmount.message}
                  </span>
                )}
                <input
                  type="text"
                  className="inputBox__form--input"
                  value={
                    separateByThousands(
                      convertToPersianNumber(form_data.financialItemAmount)
                    ) || ""
                  }
                  name="financialItemAmount"
                  id="financialItemAmount"
                  required
                  {...register("financialItemAmount", {
                    required: "مبلغ اجباری است",
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "مبلغ فقط شامل اعداد باشد",
                    },
                  })}
                />
                <label
                  className="inputBox__form--label"
                  htmlFor="financialItemAmount"
                >
                  <span>*</span> مبلغ کل
                </label>
              </div>

              <h4
                className="title-quaternary"
                style={{ justifySelf: "start", alignSelf: "center" }}
              >
                تاریخ شروع محاسبه فیش :
              </h4>

              <div className="inputBox__form">
                {errors.executeYear && (
                  <span className="error-form">
                    {errors.executeYear.message}
                  </span>
                )}
                <input
                  type="text"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.executeYear) || ""}
                  name="executeYear"
                  id="executeYear"
                  required
                  {...register("executeYear", {
                    required: "سال اجباری است",
                    minLength: {
                      value: 4,
                      message: "سال باید ۴ رقمی باشد",
                    },
                    maxLength: {
                      value: 4,
                      message: "سال باید ۴ رقمی باشد",
                    },
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "سال شامل اعداد باشد",
                    },
                  })}
                />
                <label className="inputBox__form--label" htmlFor="executeYear">
                  <span>*</span> سال
                </label>
              </div>

              <div className="inputBox__form">
                {errors.executeYear && (
                  <span className="error-form">
                    {errors.executeYear.message}
                  </span>
                )}
                <input
                  type="text"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.executeMonth) || ""}
                  name="executeMonth"
                  id="executeMonth"
                  required
                  {...register("executeMonth", {
                    required: "ماه اجباری است",
                    minLength: {
                      value: 2,
                      message: "ماه باید ۲ رقمی باشد",
                    },
                    maxLength: {
                      value: 2,
                      message: "ماه باید ۲ رقمی باشد",
                    },
                    pattern: {
                      value: /^[۰-۹0-9]+$/,
                      message: "ماه شامل اعداد باشد",
                    },
                  })}
                />
                <label className="inputBox__form--label" htmlFor="executeYear">
                  <span>*</span> ماه
                </label>
              </div>

              <div
                className="checkboxContainer__item"
                style={{ justifySelf: "start", alignSelf: "center" }}
              >
                <Checkbox
                  size="small"
                  color="success"
                  checked={!!form_data?.isInstallment}
                  name="isInstallment"
                  id="isInstallment"
                  sx={{
                    padding: 0.5,
                  }}
                  {...register("isInstallment")}
                />
                <label
                  htmlFor="isInstallment"
                  className="checkboxContainer__label"
                >
                  قسطی
                </label>
              </div>

              {form_data.isInstallment && (
                <>
                  <div className="inputBox__form">
                    {errors.instalementCount && (
                      <span className="error-form">
                        {errors.instalementCount.message}
                      </span>
                    )}
                    <input
                      type="text"
                      className="inputBox__form--input"
                      value={
                        convertToPersianNumber(form_data?.instalementCount) ||
                        ""
                      }
                      name="instalementCount"
                      id="instalementCount"
                      required
                      {...register("instalementCount", {
                        required: "تعداد قسط اجباری است",
                        pattern: {
                          value: /^[۰-۹0-9]+$/,
                          message: "تعداد قسط شامل اعداد باشد",
                        },
                      })}
                    />
                    <label
                      className="inputBox__form--label"
                      htmlFor="instalementCount"
                    >
                      <span>*</span> تعداد قسط
                    </label>
                  </div>

                  <div className="inputBox__form">
                    {errors.instalementAmount && (
                      <span className="error-form">
                        {errors.instalementAmount.message}
                      </span>
                    )}
                    <input
                      type="text"
                      className="inputBox__form--input"
                      value={
                        convertToPersianNumber(form_data?.instalementAmount) ||
                        ""
                      }
                      name="instalementAmount"
                      id="instalementAmount"
                      required
                      {...register("instalementAmount", {
                        required: "مبلغ قسط اجباری است",
                        pattern: {
                          value: /^[۰-۹0-9]+$/,
                          message: "مبلغ قسط شامل اعداد باشد",
                        },
                      })}
                    />
                    <label
                      className="inputBox__form--label"
                      htmlFor="instalementAmount"
                    >
                      <span>*</span> مبلغ قسط
                    </label>
                  </div>
                </>
              )}
            </div>

            <div style={{ marginRight: "auto" }}>
              <LoadingButton
                dir="ltr"
                endIcon={<SaveIcon />}
                variant="contained"
                onClick={handleSubmit}
                type="submit"
                // loading={isUpdating}
                color="success"
              >
                <span>ذخیره</span>
              </LoadingButton>
            </div>
          </form>
        </section>
      )}
    </>
  );
  return content;
}
export default PayItemForm;
