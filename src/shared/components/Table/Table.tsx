// IMPORTS
import { CustomCheckBox } from "../CustomCheckBox";
import {
  TableRowProps,
  CheckboxGroupProps,
  TableHeaderProps,
  TableHeadRowProps,
} from "./types";

export const Table = () => {};

Table.Header = ({ title, colSpan = 4 }: TableHeaderProps) => {
  return (
    <tr>
      <th colSpan={colSpan} className="pdf-table-center-text">
        {title}
      </th>
    </tr>
  );
};

Table.HeadRow = ({ cells }: TableHeadRowProps) => {
  return (
    <tr>
      {cells.map((cell, index) => (
        <th
          key={index}
          style={{ width: cell.width }}
          className="pdf-table-center-text"
        >
          {cell.title}
        </th>
      ))}
    </tr>
  );
};

Table.HeadRowRight = ({ cells }: TableHeadRowProps) => {
  return (
    <tr>
      {cells.map((cell, index) => (
        <th key={index} style={{ width: cell.width }}>
          {cell.title}
        </th>
      ))}
    </tr>
  );
};

Table.Row = ({ columns }: TableRowProps) => {
  return (
    <tr>
      {columns.map((column, index) => (
        <td key={index} colSpan={column.colSpan}>
          {column.content}
        </td>
      ))}
    </tr>
  );
};

Table.CheckBoxGroup = ({ checkboxes, title, control }: CheckboxGroupProps) => {
  return (
    <div className="pdf-person-info-table--checkbox">
      <span>{title}:</span>
      {checkboxes.map((checkbox, index) => (
        <CustomCheckBox
          key={index}
          name={checkbox.name}
          label={checkbox.label}
          control={control}
          disabled={checkbox.disabled}
        />
      ))}
    </div>
  );
};
