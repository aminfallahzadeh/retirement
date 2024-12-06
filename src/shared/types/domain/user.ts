export type Permission = {
  itemID: string;
  parentID: string;
  url: string;
};

export type PermissionData = {
  itemList: Permission[];
};
