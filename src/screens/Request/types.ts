export type RequestInfoType = {
  requestNO: string;
  requestDate: string;
  personFirstName: string;
  personLastName: string;
  requestTypeNameFa: string;
  requestText: string;
};

export type RequestConditionType = {
  nextSate: number;
  conditionValue: number;
  buttonName: string;
};

export type RequestAttachment = {
  id: string;
  attachementTypeName: string;
  attachment: string;
  requestAttachmentID: string;
  contentType: string;
  attachementDesc: string;
  previewImage: string;
  attachmentTypeName: string;
  image: string;
};

export type RequestHistory = {
  id: string;
  firstName: string;
  lastName: string;
  roleName: string;
  date: string;
  description: string;
  stateName: string;
  accept: string;
};

export type Expert = {
  userID: string;
  firstName: string;
  lastName: string;
};
