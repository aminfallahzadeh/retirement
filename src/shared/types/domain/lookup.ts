export type LookupDistinct = {
  lookUpType: string;
  lookUpTypeName: string;
};

export type LookUp = {
  lookUpID: string;
  lookUpName: string;
};

export type LookupDistinctData = {
  itemList: LookupDistinct[];
};

export type LookUpData = {
  itemList: LookUp[];
};
