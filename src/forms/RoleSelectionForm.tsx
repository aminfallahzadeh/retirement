// IMPORTS
import { setSelectedRole } from "@/slices/roleDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { optionsGenerator } from "@/utils/reactSelect";
import { SelectInput } from "@/shared/components/SelectInput";

function RoleSelectionForm({ isLoading, roles }) {
  const dispatch = useDispatch();

  const { selectedRole } = useSelector((state) => state.roleData);

  // SELECT OPTIONS
  const rolesOptions = optionsGenerator(roles, "url", "itemName");

  const handleSelectOptionChange = (selectedOption) => {
    if (selectedOption) {
      dispatch(setSelectedRole(selectedOption));
    } else {
      dispatch(setSelectedRole(null));
    }
  };

  return (
    <div style={{ width: "300px", height: "40px", margin: "10px auto" }}>
      <SelectInput
        options={rolesOptions}
        defaultValue={selectedRole}
        isLoading={isLoading}
        onChange={handleSelectOptionChange}
        placeholder={<div className="react-select-placeholder">نقش</div>}
        name="selectedRole"
        label="نقش"
        required={false}
      />
    </div>
  );
}

export default RoleSelectionForm;
