export type GetExpertParams = {
  RequestID: string;
  conditionValue: string;
  Role: string;
};

export type GetRequestParams = {
  Role: string;
  personID?: string;
  requestID?: string;
  RequestDateFrom?: string;
  RequestDateTo?: string;
};

export type RequestItem = {
  requestID: string;
  requestNO: string;
  requestTypeID: string;
  personID: string;
  requestTypeNameFa: string;
  personFirstName: string;
  personLastName: string;
  requestDate: string;
  requestText: string;
};

export type GetRequestReponse = {
  itemList: RequestItem[];
};
