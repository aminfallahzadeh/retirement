// IMPORTS
import { Title } from "@/shared/components/Title";
import { CREATE_RELATED } from "@/constants/const";
import { useSearchParams } from "react-router-dom";
import CreateRelated from "./forms/CreateRelated";
import UpdateRelated from "./forms/UpdateRelated";

const Related = () => {
  // STATES
  const [searchParams] = useSearchParams();

  // CONSTS
  const mode = searchParams.get("mode");

  return (
    <section className="flex-col">
      <Title title={CREATE_RELATED} back={true} />

      {mode === "create" ? (
        <CreateRelated />
      ) : mode === "update" ? (
        <UpdateRelated />
      ) : null}
    </section>
  );
};

export default Related;
