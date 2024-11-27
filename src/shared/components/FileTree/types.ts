// IMPORTS
import { ReactNode, ElementType } from "react";
import { UseTreeItem2Parameters } from "@mui/x-tree-view/useTreeItem2";
import { ArchiveStructure, Archive } from "@/shared/types/archive";

export type FileType =
  | "image"
  | "pdf"
  | "doc"
  | "video"
  | "folder"
  | "pinned"
  | "trash";

export type Access = "files" | "folders" | "all";

export type FileTreeProps = {
  structure: ArchiveStructure[];
  files?: Archive[];
  isLoading: boolean;
  access: Access;
  refetch: () => void;
};

export type SelectedItem = {
  fileType: FileType;
  id: string;
  label: string;
  attatchment?: string;
  children?: TreeFolder[] | TreeFile[];
} | null;

export type TreeFile = {
  fileType: FileType;
  id: string;
  label: string;
  attatchment: string;
};

export type TreeFolder = {
  fileType: FileType;
  id: string;
  label: string;
  children?: TreeFolder[] | TreeFile[];
};

export type Tree = TreeFolder | TreeFile;

export interface CustomLabelProps {
  children: ReactNode;
  icon?: ElementType;
  expandable?: boolean;
}

export interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, "rootRef">,
    Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {}
