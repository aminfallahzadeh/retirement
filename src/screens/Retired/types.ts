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
