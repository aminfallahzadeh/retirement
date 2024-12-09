// export type Personnel = {
//   id: string;
//   personID: string;
//   personDeathDate: string;
//   personnelID: string;
//   personNationalCode: string;
//   personFirstName: string;
//   personLastName: string;
// };

// export type PersonnelData = {
//   itemList: Personnel[];
// };

export type PersonnelItem = {
  id: string;
  personnelRowNum: number;
  personnelDeathDate: string;
  personnelID: string;
  personnelNationalCode: string;
  personnelFirstName: string;
  personnelLastName: string;
};
