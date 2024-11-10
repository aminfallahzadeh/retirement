// IMPORTS
import { FormStructure } from "@/shared/types/form";
import { Input } from "@/shared/components/Input";

export const FormGroup = ({ structure }: { structure: FormStructure[] }) => {
  const renderForm = (item: FormStructure) => <Input name={item.name} />;
  return structure.map(renderForm);
};
