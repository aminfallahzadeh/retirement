// IMPORTS
import { CustomLabelProps } from "../types";
import { TreeItem2Label } from "@mui/x-tree-view/TreeItem2";
import Box from "@mui/material/Box";
import { StyledTreeItemLabelText } from "../styles";
// import { DotIcon } from "./DotIcon";

export const CustomLabel = ({
  icon: Icon,
  //   expandable,
  children,
  ...other
}: CustomLabelProps) => {
  return (
    <TreeItem2Label
      {...other}
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {Icon && (
        <Box
          component={Icon}
          className="labelIcon"
          color="inherit"
          sx={{ mr: 1, fontSize: "1.2rem" }}
        />
      )}

      <StyledTreeItemLabelText variant="body2">
        {children}
      </StyledTreeItemLabelText>
      {/* {expandable && <DotIcon />} */}
    </TreeItem2Label>
  );
};
