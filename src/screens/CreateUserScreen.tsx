// IMPORTS
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import GroupsCreateUserGrid from "@/grids/GroupsCreateUserGrid";
import CreateUserForm from "@/forms/CreateUserForm";

function CreateUserScreen() {
  const [addedGroups, setAddedGroups] = useState([]);

  const navigate = useNavigate();

  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span> ایجاد کاربر جدید
        </h4>

        <div style={{ marginRight: "auto" }} className="back-button">
          <IconButton color="primary" onClick={() => navigate(-1)}>
            <BackIcon />
          </IconButton>
        </div>
      </div>

      <div
        className="flex-row flex-center"
        style={{ alignItems: "flex-start" }}
      >
        <CreateUserForm addedGroups={addedGroups} />

        <div style={{ width: "500px" }}>
          <GroupsCreateUserGrid setAddedGroups={setAddedGroups} />
        </div>
      </div>
    </section>
  );

  return content;
}

export default CreateUserScreen;
