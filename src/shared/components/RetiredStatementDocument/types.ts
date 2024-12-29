export type RetiredInfo = {
  personNationalCode: string;
  personFirstName: string;
  personLastName: string;
  retiredID: string;
  personCertificateNo: string;
  personFatherName: string;
  personBirthDate: string;
  personBirthPlace: string;
  genderName: string;
  insuranceCode: string;
  maritalStatusName: string;
  personPostalCode: string;
  personIsSacrificedFamily: boolean;
  personIsValiant: boolean;
  personIsCaptive: boolean;
  personIsWarrior: boolean;
  personIsSacrificed: boolean;
  personIsChildOfSacrificed: boolean;
  retirementDate: string;
  retiredLastPosition: string;
  retiredOrganizationName: string;
  retiredRealDurationDAY: string;
  retiredRealDurationMONTH: string;
  retiredRealDurationYEAR: string;
  retiredGrantDuration: string;
  retiredJobDegree: string;
  educationTypeName: string;
  personDeathDate: string;
};

type StatementRelated = {
  personNationalCode: string;
  personFirstName: string;
  personLastName: string;
  personFatherName: string;
  personBirthDate: string;
  relationshipWithParentName: string;
  heirRight: string;
  supplementaryRight: string;
  maritalRight: string;
  childRight: string;
};

export type Amount = {
  retirementStatementItemID: string;
  retirementStatementItemAmount: string;
  retirementStatementItemName: string;
};

export type StatementInfo = {
  retirementStatementSerial: string;
  retirementStatementChildrenCount: number;
  retirementStatementTypeName: string;
  retiredGroup: string;
  retirementStatementDesc: string;
  sumRetirementStatementAmount: string;
  retirementStatementRunDate: string;
  retirementStatementIssueDate: string;
  retirementStatementNo: string;
  retirementStatementRelatedList: StatementRelated[];
  retirementStatementAmountList: Amount[];
  retirementStatementRelatedCount: number;
};

export type EditStatementFormProps = {
  statementID: string | null;
  foundItems: Amount[];
  toggleModal: () => void;
  refetch: () => void;
};
