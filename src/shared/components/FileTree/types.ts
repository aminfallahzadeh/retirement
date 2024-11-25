// IMPORTS
import { ReactNode, ElementType } from "react";
import { UseTreeItem2Parameters } from "@mui/x-tree-view/useTreeItem2";

export type FileType =
  | "image"
  | "pdf"
  | "doc"
  | "video"
  | "folder"
  | "pinned"
  | "trash";

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

export type ExtendedTreeItemProps = {
  fileType: FileType;
  id: string;
  label: string;
  attachment?: string;
  children?: ExtendedTreeItemProps[];
};

export interface CustomLabelProps {
  children: ReactNode;
  icon?: ElementType;
  expandable?: boolean;
}

export interface CustomTreeItemProps
  extends Omit<UseTreeItem2Parameters, "rootRef">,
    Omit<React.HTMLAttributes<HTMLLIElement>, "onFocus"> {}
