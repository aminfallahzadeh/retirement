// IMPORTS
import { useParams } from "react-router-dom";
import { Title } from "@/shared/components/Title";
import { RetiredStatementDocument } from "@/shared/components/RetiredStatementDocument";
import { PaySlipDocument } from "@/shared/components/PaySlipDocument";
import { PersonnelStatementDocument } from "@/shared/components/PersonnelStatementDocument";
import {
  STATEMENT_PRINT,
  PAYSLIP,
  RECRUITING_STATEMENT,
} from "@/constants/const";

const Document = () => {
  // STATES
  // CONSTS
  const { type } = useParams();

  // HANDLERS
  const renderContent = (type: string | undefined) => {
    switch (type) {
      case "rstatement":
        return <RetiredStatementDocument />;
        break;

      case "rslip":
        return <PaySlipDocument />;
        break;

      case "pstatement":
        return <PersonnelStatementDocument />;
        break;

      default:
        return null;
    }
  };

  const title =
    type === "rstatement"
      ? STATEMENT_PRINT
      : type === "rslip"
      ? PAYSLIP
      : type === "pstatement"
      ? RECRUITING_STATEMENT
      : "";

  const content = (
    <section className="flex-col mb-20">
      <Title title={title} back={true} />

      {renderContent(type)}
    </section>
  );

  return content;
};

export default Document;
