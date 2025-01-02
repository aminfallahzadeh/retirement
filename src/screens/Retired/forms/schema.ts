export const retiredPersonSchema: string[] = [
  "personFirstName",
  "personLastName",
  "personNationalCode",
  "personCertificateNo",
  "personFatherName",
  "genderID",
  "personBirthDate",
  "personBirthPlace",
  "personPreviousNam",
  "personIsSacrificedFamily",
  "personIsWarrior",
  "personIsChildOfSacrificed",
  "personIsValiant",
  "personIsSacrificed",
  "personIsCaptive",
  "retiredID",
  "personPhone",
  "personCellPhone",
  "backupPhone",
  "backupFirstName",
  "backupLastName",
  "personEmail",
  "educationTypeID",
  "personCountryID",
  "personStateID",
  "personCityID",
  "personRegion",
  "personArea",
  "personPostalCode",
  "housingTypeID",
  "maritalStatusID",
  "personDeathDate",
  "personAddress",
  "personDescription",
];

export const retiredPensionarySchema: string[] = [
  "retiredGroup",
  "retiredOrganizationID",
  "retiredLastPosition",
  "employmentTypeID",
  "retirementDate",
  "pensionaryStatusID",
  "pensionaryStartdate",
  "retiredJobDegreeCoef",
  "retiredGrantDuration",
  "retiredRealDuration",
];

export const retiredAdditionalInfoSchema: string[] = [
  "bankID",
  "bankBranchID",
  "accountNo",
  "ledgerCode",
  "insuranceCoef",
  "insuranceAmount",
];

export const retiredPersonIntKeys: string[] = [
  "personRegion",
  "personArea",
  "retiredID",
];

export const retiredPensionaryIntKeys: string[] = [
  "retiredGroup",
  "retiredJobDegree",
  "retiredJobDegreeCoef",
  "retiredRealDuration",
  "retiredRealDurationYEAR",
  "retiredRealDurationMONTH",
  "retiredRealDurationDAY",
  "retiredGrantDuration",
];

export const retiredAdditionalInfoIntKeys: string[] = ["ledgerCode"];

export const retiredPersonFloatKeys: string[] = [
  "insuranceAmount",
  "insuranceCoef",
];
