export type SlipInfo = {
  personFirstName: string;
  personLastName: string;
  currentYear: string;
  currentMonth: string;
  personEmploymentTypeName: string;
  personBankName: string;
  personBankBranchName: string;
  personAccount: string;
  payAmount: string;
};

export type PayItem = {
  payItemAmount: number;
  payItemTypeName: string;
  remainedAmount: string;
  financialItemAmount: string;
};
