// IMPORTS
import { Title } from "@/shared/components/Title";
import GenerateStatementForm from "./forms/GenerateStatementForm";
import { GENERATE_STATEMENT } from "@/constants/const";

const GenerateStatement = () => {
  return (
    <section className="flex-col">
      <Title title={GENERATE_STATEMENT} back={true} />

      <GenerateStatementForm />
    </section>
  );
};

export default GenerateStatement;
