// IMPORTS
import { FieldView } from "@/shared/components/FieldView";
import { RetiredData } from "../types";
import { convertToPersianDateFormatted } from "@/helpers/dateConverter";
import {
  FIRST_NAME,
  LAST_NAME,
  NATIONAL_CODE,
  CERTIFICATE_NO,
  FATHER_NAME,
  GENDER,
  BIRTH_DATE,
  BIRTH_PLACE,
  PREVIOUS_NAME,
  SACRIFICE_STATUS,
  SACRIFICED_FAMILY,
  WARRIOR,
  CHILD_OF_SACRIFICED,
  VALIANT,
  SACRIFICED,
  CAPTIVE,
  RETIRED_NO,
  PHONE_NO,
  MOBILE_NO,
  BACKUP_FIRST_NAME,
  BACKUP_LAST_NAME,
  EMAIL_ADDRESS,
  EDUCATION_DEGREE,
  COUNTRY,
  STATE,
  CITY,
  REGION,
  AREA,
  POSTAL_CODE,
  HOUSING_STATUS,
  MARITIAL_STATUS,
  DEATH_DATE,
  ADDRESS,
  DESCRIPTION,
  GROUP,
  LAST_ORGANIZATION,
  POSITION,
  EMPLOYMENT_TYPE,
  RETIREMENT_DATE,
  STATUS,
  CHANGE_STATUS_DATE,
  JOB_DEGREE_COEF,
  RETIRED_REAL_DURATION,
  RETIRED_GRANT_DURATION,
  BANK,
  BANK_BRANCH,
  ACCOUNT_NO,
  LEDGER_CODE,
  INSURANCE_COEF,
  INSURANCE_AMOUNT,
} from "@/constants/const";

export const ResultForm = ({ data }: { data: RetiredData }) => {
  return (
    <section className="flex-col formContainer mb-20">
      <div className="grid grid-cols-4">
        <FieldView.Text
          value={data?.personFirstName || "-"}
          label={FIRST_NAME}
        />
        <FieldView.Text value={data?.personLastName || "-"} label={LAST_NAME} />
        <FieldView.Text
          value={data?.personNationalCode || "-"}
          label={NATIONAL_CODE}
        />
        <FieldView.Text
          value={data?.personCertificateNo || "-"}
          label={CERTIFICATE_NO}
        />
        <FieldView.Text
          value={data?.personFatherName || "-"}
          label={FATHER_NAME}
        />
        <FieldView.Text value={data?.genderName || "-"} label={GENDER} />
        <FieldView.Text
          value={
            convertToPersianDateFormatted(data?.personBirthDate as string) ||
            "-"
          }
          label={BIRTH_DATE}
        />
        <FieldView.Text
          value={data?.personBirthPlace || "-"}
          label={BIRTH_PLACE}
        />
        <FieldView.Text
          value={data?.personPreviousName || "-"}
          label={PREVIOUS_NAME}
        />

        <div className="checkboxContainer col-span-3">
          <p className="inputBox__form--readOnly-label">{SACRIFICE_STATUS}</p>
          <FieldView.CheckBox
            checked={data?.personIsSacrificedFamily || false}
            label={SACRIFICED_FAMILY}
          />
          <FieldView.CheckBox
            checked={data?.personIsWarrior || false}
            label={WARRIOR}
          />
          <FieldView.CheckBox
            checked={data?.personIsChildOfSacrificed || false}
            label={CHILD_OF_SACRIFICED}
          />

          <FieldView.CheckBox
            checked={data?.personIsValiant || false}
            label={VALIANT}
          />

          <FieldView.CheckBox
            checked={data?.personIsSacrificed || false}
            label={SACRIFICED}
          />

          <FieldView.CheckBox
            checked={data?.personIsCaptive || false}
            label={CAPTIVE}
          />
        </div>

        <FieldView.Text value={data?.retiredID || "-"} label={RETIRED_NO} />
        <FieldView.Text value={data?.personPhone || "-"} label={PHONE_NO} />
        <FieldView.Text
          value={data?.personCellPhone || "-"}
          label={MOBILE_NO}
        />
        <FieldView.Text
          value={data?.backupFirstName || "-"}
          label={BACKUP_FIRST_NAME}
        />
        <FieldView.Text
          value={data?.backupLastName || "-"}
          label={BACKUP_LAST_NAME}
        />
        <FieldView.Text
          value={data?.personEmail || "-"}
          label={EMAIL_ADDRESS}
        />
        <FieldView.Text
          value={data?.educationTypeName || "-"}
          label={EDUCATION_DEGREE}
        />
        <FieldView.Text
          value={data?.personCountryName || "-"}
          label={COUNTRY}
        />
        <FieldView.Text value={data?.personStateName || "-"} label={STATE} />
        <FieldView.Text value={data?.personCityName || "-"} label={CITY} />
        <FieldView.Text value={data?.personRegion || "-"} label={REGION} />
        <FieldView.Text value={data?.personArea || "-"} label={AREA} />
        <FieldView.Text
          value={data?.personPostalCode || "-"}
          label={POSTAL_CODE}
        />
        <FieldView.Text
          value={data?.housingTypeName || "-"}
          label={HOUSING_STATUS}
        />
        <FieldView.Text
          value={data?.maritalStatusName || "-"}
          label={MARITIAL_STATUS}
        />
        <FieldView.Text
          value={
            convertToPersianDateFormatted(data?.personDeathDate as string) ||
            "-"
          }
          label={DEATH_DATE}
        />

        <FieldView.TextArea
          value={data?.personAddress || "-"}
          label={ADDRESS}
          classNames="col-span-3"
        />

        <FieldView.TextArea
          value={data?.personDescription || "-"}
          label={DESCRIPTION}
          classNames="col-span-4 row-span-2"
        />

        <FieldView.Text value={data?.retiredGroup || "-"} label={GROUP} />
        <FieldView.Text
          value={data?.retiredOrganizationName || "-"}
          label={LAST_ORGANIZATION}
        />
        <FieldView.Text
          value={data?.retiredLastPosition || "-"}
          label={POSITION}
        />
        <FieldView.Text
          value={data?.employmentTypeName || "-"}
          label={EMPLOYMENT_TYPE}
        />
        <FieldView.Text
          value={
            convertToPersianDateFormatted(data?.retirementDate as string) || "-"
          }
          label={RETIREMENT_DATE}
        />
        <FieldView.Text
          value={data?.pensionaryStatusName || "-"}
          label={STATUS}
        />
        <FieldView.Text
          value={
            convertToPersianDateFormatted(
              data?.pensionaryStartdate as string
            ) || "-"
          }
          label={CHANGE_STATUS_DATE}
        />
        <FieldView.Text
          value={data?.retiredJobDegreeCoef || "-"}
          label={JOB_DEGREE_COEF}
        />
        <FieldView.Text
          value={data?.retiredGrantDuration || "-"}
          label={RETIRED_REAL_DURATION}
        />
        <FieldView.Text
          value={data?.retiredRealDuration || "-"}
          label={RETIRED_GRANT_DURATION}
        />
        <FieldView.Text value={data?.bankName || "-"} label={BANK} />
        <FieldView.Text
          value={data?.bankBranchName || "-"}
          label={BANK_BRANCH}
        />
        <FieldView.Text value={data?.accountNo || "-"} label={ACCOUNT_NO} />
        <FieldView.Text value={data?.ledgerCode || "-"} label={LEDGER_CODE} />
        <FieldView.Text
          value={data?.insuranceCoef || "-"}
          label={INSURANCE_COEF}
        />
        <FieldView.Text
          value={data?.insuranceAmount || "-"}
          label={INSURANCE_AMOUNT}
        />
      </div>
    </section>
  );
};
