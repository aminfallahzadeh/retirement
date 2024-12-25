// IMPORTS
import { UseFormReturn } from "react-hook-form";

export interface TableHeaderProps {
  title: string;
  colSpan?: number;
}

export interface TableHeadRowProps {
  cells: string[];
}

export interface TableRowColumn {
  content: string;
  colSpan?: number;
}

export interface TableRowProps {
  columns: TableRowColumn[];
}

export interface CheckboxGroupProps {
  checkboxes: {
    name: string;
    label: string;
    disabled: boolean;
  }[];
  title: string;
  control: UseFormReturn["control"];
}
