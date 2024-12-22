// REACT IMPORTS
import { useState, useEffect, useRef } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

// HELPERS
import { convertToPersianNumber } from "@/helper";

// MUI
import { LoadingButton } from "@mui/lab";
import { Done as DoneIcon } from "@mui/icons-material";
import { Checkbox } from "@mui/material";

// LIBRARIES
import Select from "react-select";
import makeAnimated from "react-select/animated";

// ASSETS
import { MdOutlineCalculate } from "react-icons/md";

// UTILS
import {
  selectStyles,
  selectSettings,
  optionsGenerator,
} from "@/utils/reactSelect";

// TYPES
interface FractionFormData {
  nationaCode: string;
  name: string;
  familyName: string;
  personID: string;
  calcualteType: object;
  oraginaztionName: object;
  fractionPrice: string;
  isTadiye: boolean;
  isInstallment: boolean;
}

function FractionFormSecondTab() {
  const animatedComponents = makeAnimated();

  // ACCESS REACT HOOK FORM CONTROL
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    watch,
  } = useForm<FractionFormData>();

  // ACCESS REACT HOOK FORM DATA
  const form_data = watch();

  const onSubmit: SubmitHandler<FractionFormData> = () => {
    console.log(form_data);
  };

  const content = (
    <section className="formContainer flex-col">
      <form
        method="POST"
        className="flex-col"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid--col-5">
          {/* <div className="inputBox__form">
            {errors.nationaCode && (
              <span className="error-form">{errors.nationaCode.message}</span>
            )}
            <input
              type="text"
              id="nationaCode"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.nationaCode) ?? ""}
              required
              {...register("nationaCode", {
                required: "شماره ملی اجباری است",
                // pattern: {
                //   value: /^[۰-۹0-9]+$/,
                //   message: "گروه باید فقط شامل اعداد باشد",
                // },
              })}
            />
            <label htmlFor="nationaCode" className="inputBox__form--label">
              <span>*</span> شماره ملی
            </label>
          </div> */}

          {/* <div className="inputBox__form">
            {errors.name && (
              <span className="error-form">{errors.name.message}</span>
            )}
            <input
              type="text"
              id="name"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.name) ?? ""}
              required
              {...register("name", {
                required: "نام اجباری است",
                // pattern: {
                //   value: /^[۰-۹0-9]+$/,
                //   message: "گروه باید فقط شامل اعداد باشد",
                // },
              })}
            />
            <label htmlFor="name" className="inputBox__form--label">
              <span>*</span> نام
            </label>
          </div> */}

          {/* <div className="inputBox__form">
            {errors.familyName && (
              <span className="error-form">{errors.familyName.message}</span>
            )}
            <input
              type="text"
              id="familyName"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.familyName) ?? ""}
              required
              {...register("familyName", {
                required: "نام خانوادگی اجباری است",
                // pattern: {
                //   value: /^[۰-۹0-9]+$/,
                //   message: "گروه باید فقط شامل اعداد باشد",
                // },
              })}
            />
            <label htmlFor="familyName" className="inputBox__form--label">
              <span>*</span> نام خانوادگی
            </label>
          </div> */}

          {/* <div className="inputBox__form">
            {errors.familyName && (
              <span className="error-form">{errors.familyName.message}</span>
            )}
            <input
              type="text"
              id="personID"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.personID) ?? ""}
              required
              {...register("personID", {
                required: "نام خانوادگی اجباری است",
                // pattern: {
                //   value: /^[۰-۹0-9]+$/,
                //   message: "گروه باید فقط شامل اعداد باشد",
                // },
              })}
            />
            <label htmlFor="personID" className="inputBox__form--label">
              <span>*</span> شماره کارمندی
            </label>
          </div> */}

          <div></div>

          {/* <div className="inputBox__form">
            <Controller
              name="calcualteType"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">
                      <span>*</span> نوع محاسیه کسور
                    </div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                />
              )}
            />

            <label
              className={
                form_data?.calcualteType
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              <span>*</span> نوع محاسبه کسور
            </label>
          </div> */}

          {/* <div className="inputBox__form">
            <Controller
              name="oraginaztionName"
              control={control}
              render={({ field: { onChange } }) => (
                <Select
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  // options={issueTypeOptions}
                  // onChange={(val) => onChange(val ? val.value : null)}
                  // value={issueTypeOptions.find(
                  //   (c) => c.value === form_data?.issueType
                  // )}
                  isClearable={true}
                  placeholder={
                    <div className="react-select-placeholder">
                      <span>*</span> نام سازمان
                    </div>
                  }
                  noOptionsMessage={selectSettings.noOptionsMessage}
                  loadingMessage={selectSettings.loadingMessage}
                  styles={selectStyles}
                />
              )}
            />

            <label
              className={
                form_data?.oraginaztionName
                  ? "inputBox__form--readOnly-label"
                  : "inputBox__form--readOnly-label-hidden"
              }
            >
              <span>*</span> نام سازمان
            </label>
          </div> */}

          {/* <div></div>
          <div></div>

          <div style={{ marginRight: "auto" }}>
            <LoadingButton
              loading={false}
              type="submit"
              endIcon={<MdOutlineCalculate />}
              variant="contained"
              color="warning"
              sx={{ fontFamily: "IranYekan" }}
            >
              <span>محاسبه سنوات</span>
            </LoadingButton>
          </div>
        </div> */}
      </form>

      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#ddd",
          margin: "10px 0",
        }}
      ></div>

      <form
        method="POST"
        className="flex-col"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid--col-5">
          <div className="inputBox__form">
            {errors.fractionPrice && (
              <span className="error-form">{errors.fractionPrice.message}</span>
            )}
            <input
              type="text"
              id="fractionPrice"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
              required
              {...register("fractionPrice", {
                required: "مبلغ مشمول کسور اجباری است",
                // pattern: {
                //   value: /^[۰-۹0-9]+$/,
                //   message: "گروه باید فقط شامل اعداد باشد",
                // },
              })}
            />
            <label htmlFor="fractionPrice" className="inputBox__form--label">
              <span>*</span> مبلغ مشمول کسور
            </label>
          </div>

          <div className="inputBox__form">
            {errors.fractionPrice && (
              <span className="error-form">{errors.fractionPrice.message}</span>
            )}
            <input
              type="text"
              id="fractionPrice"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
              required
              {...register("fractionPrice", {
                required: "مبلغ مشمول کسور اجباری است",
                // pattern: {
                //   value: /^[۰-۹0-9]+$/,
                //   message: "گروه باید فقط شامل اعداد باشد",
                // },
              })}
            />
            <label htmlFor="fractionPrice" className="inputBox__form--label">
              <span>*</span> مبلغ منتقله
            </label>
          </div>
          <div></div>
          <div></div>
          <div></div>

          <h4
            className="title-quaternary"
            style={{ justifySelf: "start", alignSelf: "center" }}
          >
            سنوات قابل محاسبه :
          </h4>

          <h4
            className="title-quaternary"
            style={{ justifySelf: "start", alignSelf: "center" }}
          >
            تاریخ از :
          </h4>

          <div className="inputBox__form">
            {errors.fractionPrice && (
              <span className="error-form">{errors.fractionPrice.message}</span>
            )}
            <input
              type="text"
              id="fractionPrice"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
              required
              {...register("fractionPrice", {
                required: "مبلغ مشمول کسور اجباری است",
                // pattern: {
                //   value: /^[۰-۹0-9]+$/,
                //   message: "گروه باید فقط شامل اعداد باشد",
                // },
              })}
            />
            <label htmlFor="fractionPrice" className="inputBox__form--label">
              <span>*</span>سال
            </label>
          </div>

          <div className="inputBox__form">
            {errors.fractionPrice && (
              <span className="error-form">{errors.fractionPrice.message}</span>
            )}
            <input
              type="text"
              id="fractionPrice"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
              required
              {...register("fractionPrice", {
                required: "مبلغ مشمول کسور اجباری است",
                // pattern: {
                //   value: /^[۰-۹0-9]+$/,
                //   message: "گروه باید فقط شامل اعداد باشد",
                // },
              })}
            />
            <label htmlFor="fractionPrice" className="inputBox__form--label">
              <span>*</span>ماه
            </label>
          </div>

          <div className="inputBox__form">
            {errors.fractionPrice && (
              <span className="error-form">{errors.fractionPrice.message}</span>
            )}
            <input
              type="text"
              id="fractionPrice"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
              required
              {...register("fractionPrice", {
                required: "مبلغ مشمول کسور اجباری است",
                // pattern: {
                //   value: /^[۰-۹0-9]+$/,
                //   message: "گروه باید فقط شامل اعداد باشد",
                // },
              })}
            />
            <label htmlFor="fractionPrice" className="inputBox__form--label">
              <span>*</span>روز
            </label>
          </div>

          <div></div>

          <h4
            className="title-quaternary"
            style={{ justifySelf: "start", alignSelf: "center" }}
          >
            تاریخ تا :
          </h4>

          <div className="inputBox__form">
            {errors.fractionPrice && (
              <span className="error-form">{errors.fractionPrice.message}</span>
            )}
            <input
              type="text"
              id="fractionPrice"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
              required
              {...register("fractionPrice", {
                required: "مبلغ مشمول کسور اجباری است",
                // pattern: {
                //   value: /^[۰-۹0-9]+$/,
                //   message: "گروه باید فقط شامل اعداد باشد",
                // },
              })}
            />
            <label htmlFor="fractionPrice" className="inputBox__form--label">
              <span>*</span>سال
            </label>
          </div>

          <div className="inputBox__form">
            {errors.fractionPrice && (
              <span className="error-form">{errors.fractionPrice.message}</span>
            )}
            <input
              type="text"
              id="fractionPrice"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
              required
              {...register("fractionPrice", {
                required: "مبلغ مشمول کسور اجباری است",
                // pattern: {
                //   value: /^[۰-۹0-9]+$/,
                //   message: "گروه باید فقط شامل اعداد باشد",
                // },
              })}
            />
            <label htmlFor="fractionPrice" className="inputBox__form--label">
              <span>*</span>ماه
            </label>
          </div>

          <div className="inputBox__form">
            {errors.fractionPrice && (
              <span className="error-form">{errors.fractionPrice.message}</span>
            )}
            <input
              type="text"
              id="fractionPrice"
              className="inputBox__form--input"
              value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
              required
              {...register("fractionPrice", {
                required: "مبلغ مشمول کسور اجباری است",
                // pattern: {
                //   value: /^[۰-۹0-9]+$/,
                //   message: "گروه باید فقط شامل اعداد باشد",
                // },
              })}
            />
            <label htmlFor="fractionPrice" className="inputBox__form--label">
              <span>*</span>روز
            </label>
          </div>

          <div
            className="checkboxContainer__item"
            style={{ justifySelf: "start", alignSelf: "center" }}
          >
            <Checkbox
              size="small"
              color="success"
              checked={!!form_data?.isTadiye}
              id="isInstallment"
              sx={{
                padding: 0.5,
              }}
              {...register("isTadiye")}
            />
            <label htmlFor="isTadiye" className="checkboxContainer__label">
              تاخیر و تادیه
            </label>
          </div>

          {form_data.isTadiye && (
            <>
              <h4
                className="title-quaternary"
                style={{ justifySelf: "start", alignSelf: "center" }}
              >
                تاریخ از :
              </h4>

              <div className="inputBox__form">
                {errors.fractionPrice && (
                  <span className="error-form">
                    {errors.fractionPrice.message}
                  </span>
                )}
                <input
                  type="text"
                  id="fractionPrice"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
                  required
                  {...register("fractionPrice", {
                    required: "مبلغ مشمول کسور اجباری است",
                    // pattern: {
                    //   value: /^[۰-۹0-9]+$/,
                    //   message: "گروه باید فقط شامل اعداد باشد",
                    // },
                  })}
                />
                <label
                  htmlFor="fractionPrice"
                  className="inputBox__form--label"
                >
                  <span>*</span>سال
                </label>
              </div>

              <div className="inputBox__form">
                {errors.fractionPrice && (
                  <span className="error-form">
                    {errors.fractionPrice.message}
                  </span>
                )}
                <input
                  type="text"
                  id="fractionPrice"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
                  required
                  {...register("fractionPrice", {
                    required: "مبلغ مشمول کسور اجباری است",
                    // pattern: {
                    //   value: /^[۰-۹0-9]+$/,
                    //   message: "گروه باید فقط شامل اعداد باشد",
                    // },
                  })}
                />
                <label
                  htmlFor="fractionPrice"
                  className="inputBox__form--label"
                >
                  <span>*</span>ماه
                </label>
              </div>

              <div className="inputBox__form">
                {errors.fractionPrice && (
                  <span className="error-form">
                    {errors.fractionPrice.message}
                  </span>
                )}
                <input
                  type="text"
                  id="fractionPrice"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
                  required
                  {...register("fractionPrice", {
                    required: "مبلغ مشمول کسور اجباری است",
                    // pattern: {
                    //   value: /^[۰-۹0-9]+$/,
                    //   message: "گروه باید فقط شامل اعداد باشد",
                    // },
                  })}
                />
                <label
                  htmlFor="fractionPrice"
                  className="inputBox__form--label"
                >
                  <span>*</span>روز
                </label>
              </div>

              <div></div>

              <h4
                className="title-quaternary"
                style={{ justifySelf: "start", alignSelf: "center" }}
              >
                تاریخ تا :
              </h4>

              <div className="inputBox__form">
                {errors.fractionPrice && (
                  <span className="error-form">
                    {errors.fractionPrice.message}
                  </span>
                )}
                <input
                  type="text"
                  id="fractionPrice"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
                  required
                  {...register("fractionPrice", {
                    required: "مبلغ مشمول کسور اجباری است",
                    // pattern: {
                    //   value: /^[۰-۹0-9]+$/,
                    //   message: "گروه باید فقط شامل اعداد باشد",
                    // },
                  })}
                />
                <label
                  htmlFor="fractionPrice"
                  className="inputBox__form--label"
                >
                  <span>*</span>سال
                </label>
              </div>

              <div className="inputBox__form">
                {errors.fractionPrice && (
                  <span className="error-form">
                    {errors.fractionPrice.message}
                  </span>
                )}
                <input
                  type="text"
                  id="fractionPrice"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
                  required
                  {...register("fractionPrice", {
                    required: "مبلغ مشمول کسور اجباری است",
                    // pattern: {
                    //   value: /^[۰-۹0-9]+$/,
                    //   message: "گروه باید فقط شامل اعداد باشد",
                    // },
                  })}
                />
                <label
                  htmlFor="fractionPrice"
                  className="inputBox__form--label"
                >
                  <span>*</span>ماه
                </label>
              </div>

              <div className="inputBox__form">
                {errors.fractionPrice && (
                  <span className="error-form">
                    {errors.fractionPrice.message}
                  </span>
                )}
                <input
                  type="text"
                  id="fractionPrice"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
                  required
                  {...register("fractionPrice", {
                    required: "مبلغ مشمول کسور اجباری است",
                    // pattern: {
                    //   value: /^[۰-۹0-9]+$/,
                    //   message: "گروه باید فقط شامل اعداد باشد",
                    // },
                  })}
                />
                <label
                  htmlFor="fractionPrice"
                  className="inputBox__form--label"
                >
                  <span>*</span>روز
                </label>
              </div>
            </>
          )}
        </div>

        <div style={{ marginRight: "auto" }}>
          <LoadingButton
            loading={false}
            type="submit"
            endIcon={<MdOutlineCalculate />}
            variant="contained"
            color="warning"
            sx={{ fontFamily: "IranYekan" }}
          >
            <span>محاسبه کسور</span>
          </LoadingButton>
        </div>
      </form>

      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#ddd",
          margin: "10px 0",
        }}
      ></div>

      <div className="grid grid--col-5">
        <p className="fraction-item">
          جمع مشمول کسور :<span>-</span>
        </p>
        <p className="fraction-item">
          درصد سهم کارفرما : <span>-</span>
        </p>
        <p className="fraction-item">
          درصد سهم کارمند : <span>-</span>
        </p>

        <div></div>
        <div></div>

        <p className="fraction-item">
          مبلغ کسور :<span>-</span>
        </p>

        <p className="fraction-item">
          سهم کارفرما : <span>-</span>
        </p>
        <p className="fraction-item">
          سهم کارمند : <span>-</span>
        </p>
        <p className="fraction-item">
          مانده بدهی :<span>-</span>
        </p>
        <p className="fraction-item">
          مانده بستانکاری : <span>-</span>
        </p>
      </div>

      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "#ddd",
          margin: "10px 0",
        }}
      ></div>

      <form
        method="POST"
        className="flex-col"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="grid grid--col-5">
          <div
            className="checkboxContainer__item"
            style={{ justifySelf: "start", alignSelf: "center" }}
          >
            <Checkbox
              size="small"
              color="success"
              checked={!!form_data?.isInstallment}
              id="isInstallment"
              sx={{
                padding: 0.5,
              }}
              {...register("isInstallment")}
            />
            <label htmlFor="isInstallment" className="checkboxContainer__label">
              قسطی
            </label>
          </div>

          {form_data.isInstallment && (
            <>
              <div className="inputBox__form">
                {errors.fractionPrice && (
                  <span className="error-form">
                    {errors.fractionPrice.message}
                  </span>
                )}
                <input
                  type="text"
                  id="fractionPrice"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
                  required
                  {...register("fractionPrice", {
                    required: "مبلغ مشمول کسور اجباری است",
                    // pattern: {
                    //   value: /^[۰-۹0-9]+$/,
                    //   message: "گروه باید فقط شامل اعداد باشد",
                    // },
                  })}
                />
                <label
                  htmlFor="fractionPrice"
                  className="inputBox__form--label"
                >
                  <span>*</span>مبلغ قسط
                </label>
              </div>

              <div className="inputBox__form">
                {errors.fractionPrice && (
                  <span className="error-form">
                    {errors.fractionPrice.message}
                  </span>
                )}
                <input
                  type="text"
                  id="fractionPrice"
                  className="inputBox__form--input"
                  value={convertToPersianNumber(form_data?.fractionPrice) ?? ""}
                  required
                  {...register("fractionPrice", {
                    required: "مبلغ مشمول کسور اجباری است",
                    // pattern: {
                    //   value: /^[۰-۹0-9]+$/,
                    //   message: "گروه باید فقط شامل اعداد باشد",
                    // },
                  })}
                />
                <label
                  htmlFor="fractionPrice"
                  className="inputBox__form--label"
                >
                  <span>*</span>تعداد قسط
                </label>
              </div>
            </>
          )}
        </section>
        <div style={{ marginRight: "auto" }}>
          <LoadingButton
            loading={false}
            type="submit"
            endIcon={<DoneIcon />}
            variant="contained"
            color="success"
            sx={{ fontFamily: "IranYekan" }}
          >
            <span>ذخیره</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );
  return content;
}

export default FractionFormSecondTab;
