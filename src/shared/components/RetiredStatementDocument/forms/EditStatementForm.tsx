// IMPORTS
import { useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useUpdateRetirementStatementAmountMutation } from "@/features/statement/statementApi";
import { EditStatementFormProps, Amount } from "../types";
import DoneIcon from "@mui/icons-material/DoneOutlined";
import { NumberInput } from "../../NumberInput";
import { LoadingButton } from "@mui/lab";
import { onlyNumbersRules } from "@/constants/rules";
import { toastConfig } from "@/config/toast";
import { SAVE } from "@/constants/const";

export const EditStatementForm = ({
  statementID,
  foundItems,
  toggleModal,
  refetch,
}: EditStatementFormProps) => {
  // STATES
  // CONSTS
  const { control, setValue, handleSubmit } = useForm<FieldValues>();
  const [updateRetirementStatementAmount, { isLoading }] =
    useUpdateRetirementStatementAmountMutation();

  // HANDLERS
  useEffect(() => {
    foundItems.map((item: Amount) => {
      setValue(
        item.retirementStatementItemID,
        item.retirementStatementItemAmount
      );
    });
  }, [foundItems, setValue]);

  const onSubmit = async (data: FieldValues) => {
    const amountsArray = foundItems.map((item: Amount) => ({
      retirementStatementItemID: item.retirementStatementItemID,
      retirementStatementItemAmount: data[item.retirementStatementItemID],
    }));

    const response = await updateRetirementStatementAmount({
      retirementStatementID: statementID,
      data: amountsArray,
    }).unwrap();
    toastConfig.success(response.message);
    toggleModal();
    refetch();
  };

  // CONTENT
  const content = (
    <section className="flex-col">
      <form
        method="POST"
        className="flex-col"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {/* Form Fields */}
        <div className="grid grid-cols-1">
          {foundItems.map((item: Amount, index: number) => (
            <NumberInput
              key={index}
              name={item.retirementStatementItemID}
              label={item.retirementStatementItemName}
              control={control}
              required={false}
              rules={onlyNumbersRules}
              setValue={setValue}
              separate={true}
              float={true}
            />
          ))}
        </div>

        {/* Button Section */}
        <div className="flex-row mr-auto">
          <LoadingButton
            dir="ltr"
            endIcon={<DoneIcon />}
            variant="contained"
            type="submit"
            loading={isLoading}
            color="success"
          >
            <span>{SAVE}</span>
          </LoadingButton>
        </div>
      </form>
    </section>
  );

  return content;
};
