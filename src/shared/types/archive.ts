export type ArchiveStructure = {
  id: string;
  isDeleted: number;
  name: string;
  parentID: string;
  children?: ArchiveStructure[];
};

export type Archive = {
  id: string;
  archiveStructureID: string;
  attachment: string;
  contentType: string;
  isDelete: number;
  documentID: string;
};

export interface ArchiveStructureData {
  itemList: ArchiveStructure[];
}

export interface ArchiveData {
  itemList: Archive[];
}
