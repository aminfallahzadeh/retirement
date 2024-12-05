// IMPORTS
import { setRole } from "@/features/request/roleSlice";
import { useForm } from "react-hook-form";
import { selectOptionsGenerator } from "@/helpers/selectOptionsGenerator";
import { SelectInput } from "@/shared/components/SelectInput";
import { RoleDataType } from "@/shared/types/role";
import { useAppDispatch, useAppSelector } from "@/hooks/usePreTypesHooks";

export const RoleSelectionBox = ({
  isLoading,
  roles,
}: {
  isLoading: boolean;
  roles: RoleDataType["itemList"];
}) => {
  // STATES
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.role);

  // CONSTS
  const { control } = useForm();
  const rolesOptions = selectOptionsGenerator<RoleDataType["itemList"][number]>(
    roles,
    "url",
    "itemName"
  );

  const handleSelectOptionChange = (selectedOption: unknown) => {
    if (selectedOption) {
      dispatch(setRole(selectedOption));
    } else {
      dispatch(setRole(null));
    }
  };

  return (
    <div style={{ width: "300px", height: "40px", margin: "10px auto" }}>
      <SelectInput
        control={control}
        options={rolesOptions}
        defaultValue={role ? role : undefined}
        isLoading={isLoading}
        onValueChange={handleSelectOptionChange}
        name="role"
        label="نقش"
        required={false}
      />
    </div>
  );
};
