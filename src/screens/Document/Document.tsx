// IMPORTS
import { useParams } from "react-router-dom";
import { RetiredStatementDocument } from "@/shared/components/RetiredStatementDocument";
import { Title } from "@/shared/components/Title";
import { STATEMENT_PRINT } from "@/constants/const";

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

      default:
        return null;
    }
  };

  const title = type === "rstatement" ? STATEMENT_PRINT : "";

  const content = (
    <section className="flex-col mb-20">
      <Title title={title} back={true} />

      {renderContent(type)}
    </section>
  );

  return content;
};

export default Document;
