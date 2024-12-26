export type BankBranch = {
  lookUpID: string;
  lookUpName: string;
};

export type Related = {
  id: string;
  personID: string;
  pensionaryID: string;
  personBirthDate: string;
  personNationalCode: string;
  personFirstName: string;
  personLastName: string;
  pensionaryIsUnderGauranteeText: string;
  relationshipWithParentName: string;
};

export type Heir = {
  id: string;
  personID: string;
  personFirstName: string;
  personLastName: string;
  pensionaryID: string;
  personBirthDate: string;
  personNationalCode: string;
  pensionaryIsUnderGauranteeText: string;
  relationshipWithParentName: string;
  parentPersonNationalCode: string;
};

export type Slip = {
  id: string;
  payID: string;
  payCreditAmount: string;
  payDebitAmount: string;
  payAmount: string;
  payDate: string;
  currentYear: string;
  currentMonth: string;
};

export type AllRequestType = {
  id: string;
  requestID: string;
  requestNo: string;
  requestType: string;
  requestTypeID: string;
  requestNO: string;
  personID: string;
  requestTypeNameFa: string;
  personFirstName: string;
  personLastName: string;
  requestDate: string;
  requestText: string;
};
