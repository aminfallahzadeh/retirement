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
