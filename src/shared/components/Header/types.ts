export type ItemMap = {
  itemID: string;
  parentID: string;
  url: string;
  itemName?: string;
  children: ItemMap[];
};

export type TreeItem = {
  action?: string | null;
  children: TreeItem[];
  itemID: string;
  parentID: string;
  url: string;
  itemName?: string;
};
