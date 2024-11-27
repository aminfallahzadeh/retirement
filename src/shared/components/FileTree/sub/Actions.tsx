// IMPORTS
import { useReducer, useEffect } from "react";
import { actionsReducer } from "./Actions.reducer";
import { TreeModalAction } from "./Actions.reducer";
import { IconButton, Tooltip } from "@mui/material";
import {
  CreateNewFolderOutlined as AddFolderIcon,
  FolderDeleteOutlined as DeleteFolderIcon,
  AddPhotoAlternateOutlined as AddFileIcon,
  HideImageOutlined as DeleteFileIcon,
  EditOutlined as EditIcon,
  RemoveRedEyeOutlined as EyeIcon,
} from "@mui/icons-material";
import { Access, SelectedItem } from "../types";
import { CustomModal } from "@/shared/components/CustomModal";
import EditArchiveStructureForm from "../forms/EditArchiveStructureForm";
import CreateArchiveStructureForm from "../forms/CreateArchiveStructureForm";
import DeleteArchiveStructureForm from "../forms/DeleteArchiveStructureForm";
import InsertArchiveForm from "../forms/InsertArchiveForm";
import DeleteArchiveForm from "../forms/DeleteArchiveForm";
import {
  EDIT_FOLDER_NAME,
  CREATE_NEW_FOLDER,
  DELETE_FOLDER,
  DELETE_IMAGE,
  ADD_NEW_IMAGE,
  OBSERVE_FILE,
} from "@/constants/const";

/**
 * renders actions based on given access type
 */
const actionRenderers = (
  dispatch: React.Dispatch<TreeModalAction>,
  item: SelectedItem
): { [key: string]: JSX.Element } => ({
  editFolder: (
    <Tooltip title={EDIT_FOLDER_NAME} key="editFolder">
      <span>
        <IconButton
          aria-label="edit"
          color="warning"
          onClick={() =>
            dispatch({ type: "OPEN_MODAL", payload: "editFolder" })
          }
          disabled={
            item?.id === "97134493291b473f9b3bf8c4c15b27a0" ||
            !item?.id ||
            item?.fileType === "image"
          }
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </span>
    </Tooltip>
  ),
  addFolder: (
    <Tooltip title={CREATE_NEW_FOLDER} key="addFolder">
      <span>
        <IconButton
          aria-label="addFolder"
          color="success"
          onClick={() => dispatch({ type: "OPEN_MODAL", payload: "addFolder" })}
          disabled={
            item?.id === "97134493291b473f9b3bf8c4c15b27a0" ||
            !item?.id ||
            item?.fileType === "image"
          }
        >
          <AddFolderIcon />
        </IconButton>
      </span>
    </Tooltip>
  ),
  deleteFolder: (
    <Tooltip title={DELETE_FOLDER} key="deleteFolder">
      <span>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() =>
            dispatch({ type: "OPEN_MODAL", payload: "deleteFolder" })
          }
          disabled={
            item?.id === "97134493291b473f9b3bf8c4c15b27a0" ||
            !item?.id ||
            item?.fileType === "image"
          }
        >
          <DeleteFolderIcon />
        </IconButton>
      </span>
    </Tooltip>
  ),
  addFile: (
    <Tooltip title={ADD_NEW_IMAGE} key="addFile">
      <span>
        <IconButton
          aria-label="addFile"
          color="success"
          onClick={() => dispatch({ type: "OPEN_MODAL", payload: "addFile" })}
          disabled={
            item?.id === "97134493291b473f9b3bf8c4c15b27a0" ||
            !item?.id ||
            item?.fileType === "image"
          }
        >
          <AddFileIcon />
        </IconButton>
      </span>
    </Tooltip>
  ),
  deleteFile: (
    <Tooltip title={DELETE_IMAGE} key="deleteFile">
      <span>
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() =>
            dispatch({ type: "OPEN_MODAL", payload: "deleteFile" })
          }
          disabled={
            item?.id === "97134493291b473f9b3bf8c4c15b27a0" ||
            !item?.id ||
            item?.fileType === "folder"
          }
        >
          <DeleteFileIcon />
        </IconButton>
      </span>
    </Tooltip>
  ),
  observeFile: (
    <Tooltip title={OBSERVE_FILE} key="observeFile">
      <span>
        <IconButton
          aria-label="observe"
          color="primary"
          disabled={!item?.id || item?.fileType !== "image"}
        >
          <EyeIcon />
        </IconButton>
      </span>
    </Tooltip>
  ),
});

const accessMap: Record<Access, string[]> = {
  all: [
    "editFolder",
    "addFolder",
    "deleteFolder",
    "addFile",
    "deleteFile",
    "observeFile",
  ],
  folders: ["editFolder", "addFolder", "deleteFolder"],
  files: ["addFile", "deleteFile", "observeFile"],
};

export const Actions = ({
  access,
  item,
  refetch,
}: {
  access: Access;
  item: SelectedItem;
  refetch: () => void;
}) => {
  const [state, dispatch] = useReducer(actionsReducer, { modalType: null });

  // DEBUG
  useEffect(() => {
    console.log(item);
  }, [item]);

  // Render actions based on access type
  const renderActions = (access: Access) => {
    const actions = accessMap[access] || [];
    const renderers = actionRenderers(dispatch, item);
    return actions.map((action) => renderers[action]);
  };

  const content = (
    <div>
      {renderActions(access)}

      <CustomModal
        open={state.modalType !== null}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
        title={
          state.modalType === "editFolder"
            ? EDIT_FOLDER_NAME
            : state.modalType === "addFolder"
            ? CREATE_NEW_FOLDER
            : state.modalType === "deleteFolder"
            ? DELETE_FOLDER
            : state.modalType === "addFile"
            ? ADD_NEW_IMAGE
            : state.modalType === "deleteFile"
            ? DELETE_IMAGE
            : ""
        }
      >
        {state.modalType === "editFolder" ? (
          <EditArchiveStructureForm
            setCloseModal={() => dispatch({ type: "CLOSE_MODAL" })}
            item={item}
            refetch={refetch}
          />
        ) : state.modalType === "addFolder" ? (
          <CreateArchiveStructureForm
            setCloseModal={() => dispatch({ type: "CLOSE_MODAL" })}
            item={item}
            refetch={refetch}
          />
        ) : state.modalType === "deleteFolder" ? (
          <DeleteArchiveStructureForm
            setCloseModal={() => dispatch({ type: "CLOSE_MODAL" })}
            item={item}
            refetch={refetch}
          />
        ) : state.modalType === "addFile" ? (
          <InsertArchiveForm
            setCloseModal={() => dispatch({ type: "CLOSE_MODAL" })}
            item={item}
            refetch={refetch}
          />
        ) : state.modalType === "deleteFile" ? (
          <DeleteArchiveForm
            setCloseModal={() => dispatch({ type: "CLOSE_MODAL" })}
            item={item}
            refetch={refetch}
          />
        ) : (
          ""
        )}
      </CustomModal>
    </div>
  );

  return content;
};
