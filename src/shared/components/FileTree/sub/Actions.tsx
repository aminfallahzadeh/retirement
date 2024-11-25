// IMPORTS
import { IconButton, Tooltip } from "@mui/material";
import {
  CreateNewFolderOutlined as AddFolderIcon,
  FolderDeleteOutlined as DeleteFolderIcon,
  AddPhotoAlternateOutlined as AddFileIcon,
  HideImageOutlined as DeleteFileIcon,
  EditOutlined as EditIcon,
} from "@mui/icons-material";

export const Actions = () => {
  const content = (
    <div>
      <Tooltip title="ویرایش نام پوشه">
        <span>
          <IconButton aria-label="edit" color="warning">
            <EditIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="اضافه کردن پوشه">
        <span>
          <IconButton aria-label="addFolder" color="success">
            <AddFolderIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="حذف پوشه">
        <span>
          <IconButton aria-label="delete" color="error">
            <DeleteFolderIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="اضافه کردن برگه">
        <span>
          <IconButton aria-label="addFile" color="success">
            <AddFileIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="حذف برگه">
        <span>
          <IconButton aria-label="delete" color="error">
            <DeleteFileIcon />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );

  return content;
};
