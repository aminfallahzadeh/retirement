// IMPORTS
import { Ref, forwardRef, ReactNode } from "react";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2";
import FolderRounded from "@mui/icons-material/FolderRounded";
import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { TreeItem2DragAndDropOverlay } from "@mui/x-tree-view/TreeItem2DragAndDropOverlay";
import { StyledTreeItemRoot, CustomTreeItemContent } from "../styles";
import { FileType, CustomTreeItemProps } from "../types";
import Collapse from "@mui/material/Collapse";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import {
  TreeItem2Checkbox,
  TreeItem2IconContainer,
} from "@mui/x-tree-view/TreeItem2";
import clsx from "clsx";
import { animated, useSpring } from "@react-spring/web";
import { TransitionProps } from "@mui/material/transitions";
import { CustomLabel } from "./CustomLabel";

const AnimatedCollapse = animated(Collapse);

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0,${props.in ? 0 : 20}px,0)`,
    },
  });

  return <AnimatedCollapse style={style} {...props} />;
}

const isExpandable = (reactChildren: ReactNode) => {
  if (Array.isArray(reactChildren)) {
    return reactChildren.length > 0 && reactChildren.some(isExpandable);
  }
  return Boolean(reactChildren);
};

const getIconFromFileType = (fileType: FileType) => {
  switch (fileType) {
    case "image":
      return ImageIcon;
    case "pdf":
      return PictureAsPdfIcon;
    case "doc":
      return ArticleIcon;
    case "video":
      return VideoCameraBackIcon;
    case "folder":
      return FolderRounded;
    case "pinned":
      return FolderOpenIcon;
    case "trash":
      return DeleteIcon;
    default:
      return ArticleIcon;
  }
};

export const CustomTreeItem = forwardRef(function CustomTreeItem(
  props: CustomTreeItemProps,
  ref: Ref<HTMLLIElement>
) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    getDragAndDropOverlayProps,
    status,
    publicAPI,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  const item = publicAPI.getItem(itemId);
  const expandable = isExpandable(children);
  let icon;
  if (expandable) {
    icon = status.expanded ? FolderOpenIcon : FolderRounded;
  } else if (item.fileType) {
    icon = getIconFromFileType(item.fileType);
  }

  const calculateLevel = (itemId: string) => {
    return itemId.split("-").length - 1;
  };
  const level = calculateLevel(itemId);

  return (
    <TreeItem2Provider itemId={itemId}>
      <StyledTreeItemRoot
        {...getRootProps(other)}
        style={{
          marginRight: 2 * level, // Apply spacing for each nested level
        }}
      >
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx("content", {
              "Mui-expanded": status.expanded,
              "Mui-selected": status.selected,
              "Mui-focused": status.focused,
              "Mui-disabled": status.disabled,
            }),
          })}
        >
          <TreeItem2IconContainer {...getIconContainerProps()}>
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
          <TreeItem2Checkbox {...getCheckboxProps()} />
          <CustomLabel
            {...getLabelProps({
              icon,
              //   expandable: expandable && status.expanded,
            })}
          />
          <TreeItem2DragAndDropOverlay {...getDragAndDropOverlayProps()} />
        </CustomTreeItemContent>
        {children && (
          <TransitionComponent
            {...getGroupTransitionProps()}
            style={{
              marginRight: 10,
              paddingRight: 10,
              borderRight: `1px dashed rgba(0, 0, 0, 0.4)`, // Line indicator
            }}
          />
        )}
      </StyledTreeItemRoot>
    </TreeItem2Provider>
  );
});
