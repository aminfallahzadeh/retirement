// IMPORTS
import { setRole } from "@/features/request/roleSlice";
import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { createOptions } from "@/utils/optionsCreator";
import { SelectInput } from "@/shared/components/SelectInput";
import { RoleDataType, RoleType } from "@/shared/types/role";
import { useAppDispatch } from "@/hooks/usePreTypesHooks";
import { FieldValues } from "react-hook-form";
import { useLazyGetRoleQuery } from "@/features/request/requestApi";

export const RoleSelectionBox = () => {
  // STATES
  const [allRoles, setAllRoles] = useState<RoleType[]>([]);

  // CONSTS
  const dispatch = useAppDispatch();
  const { control, setValue } = useForm<FieldValues>({});
  const [getRoles, { isLoading, isFetching }] = useLazyGetRoleQuery();

  // FETCH DATA
  const fetchRoles = useCallback(async () => {
    const response = await getRoles().unwrap();
    const rolesOptions = createOptions<RoleDataType["itemList"][number]>(
      response?.itemList,
      "url",
      "itemName"
    );
    setAllRoles(rolesOptions);
    dispatch(setRole(rolesOptions[0]));
    setValue("role", rolesOptions[0]);
  }, [dispatch, getRoles, setValue]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    return () => {
      dispatch(setRole(null));
    };
  }, [dispatch]);

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
        options={allRoles}
        isLoading={isLoading || isFetching}
        onValueChange={handleSelectOptionChange}
        name="role"
        label="نقش"
        required={false}
      />
    </div>
  );
};
