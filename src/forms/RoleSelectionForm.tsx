// IMPORTS
import { setSelectedRole } from "@/slices/roleDataSlice";
import { selectOptionsGenerator } from "@/helpers/selectOptionsGenerator";
import { SelectInput } from "@/shared/components/SelectInput";
import { RoleDataType } from "@/shared/types/role";
import { useAppDispatch, useAppSelector } from "@/hooks/usePreTypesHooks";

function RoleSelectionForm({
  isLoading,
  roles,
}: {
  isLoading: boolean;
  roles: RoleDataType["itemList"];
}) {
  const dispatch = useAppDispatch();

  const { selectedRole } = useAppSelector((state) => state.roleData);

  // SELECT OPTIONS
  const rolesOptions = selectOptionsGenerator<RoleDataType["itemList"][number]>(
    roles,
    "url",
    "itemName"
  );

  const handleSelectOptionChange = (selectedOption: unknown) => {
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
