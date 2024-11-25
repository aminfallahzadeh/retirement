// IMPORTS
import { TreeItem2Root, TreeItem2Content } from "@mui/x-tree-view/TreeItem2";
import { styled, alpha } from "@mui/material/styles";
import { treeItemClasses } from "@mui/x-tree-view/TreeItem";
import Typography from "@mui/material/Typography";

export const StyledTreeItemRoot = styled(TreeItem2Root)(({ theme }) => ({
  color: theme.palette.grey[800],
  position: "relative",
  [`& .${treeItemClasses.content}`]: {
    flexDirection: "row-reverse",
    borderRadius: theme.spacing(0.7),
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    fontWeight: 500,
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
    },
    [`& .${treeItemClasses.iconContainer}`]: {
      marginRight: theme.spacing(2),
    },
    [`&.Mui-expanded `]: {
      "&:not(.Mui-focused, .Mui-selected, .Mui-selected.Mui-focused) .labelIcon":
        {
          color: theme.palette.primary.main,
        },
      "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        left: "16px",
        top: "44px",
        height: "calc(100% - 48px)",
        width: "1.5px",
        backgroundColor: theme.palette.grey[600],
      },
    },
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      color:
        theme.palette.mode === "light" ? theme.palette.primary.main : "white",
    },
    [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: theme.spacing(3.5),
    [`& .${treeItemClasses.content}`]: {
      fontWeight: 500,
    },
  },
})) as unknown as typeof TreeItem2Root;

export const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  flexDirection: "row-reverse",
  borderRadius: theme.spacing(0.7),
  marginBottom: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
  padding: theme.spacing(0.5),
  paddingRight: theme.spacing(1),
  fontWeight: 500,
  [`&.Mui-expanded `]: {
    "&:not(.Mui-focused, .Mui-selected, .Mui-selected.Mui-focused) .labelIcon":
      {
        color: theme.palette.primary.dark,
        ...theme.applyStyles("light", {
          color: theme.palette.primary.main,
        }),
      },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
      left: "16px",
      top: "44px",
      height: "calc(100% - 48px)",
      width: "1.5px",
    },
  },
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: "white",
    ...theme.applyStyles("light", {
      color: theme.palette.primary.main,
    }),
  },
  [`&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    ...theme.applyStyles("light", {
      backgroundColor: theme.palette.primary.main,
    }),
  },
}));

export const StyledTreeItemLabelText = styled(Typography)({
  color: "inherit",
  fontFamily: "IranYekan",
  fontWeight: "inherit",
}) as unknown as typeof Typography;
