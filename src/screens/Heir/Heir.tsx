// IMPORTS
import { Title } from "@/shared/components/Title";
import { CREATE_HEIR, UPDATE_HEIR } from "@/constants/const";
import { useSearchParams } from "react-router-dom";
import CreateHeirForm from "./forms/CreateHeirForm";
import UpdateHeirForm from "./forms/UpdateHeirForm";

const Heir = () => {
  // STATES
  const [searchParams] = useSearchParams();

  // CONSTS
  const mode = searchParams.get("mode");

  return (
    <section className="flex-col">
      <Title
        title={mode === "update" ? UPDATE_HEIR : CREATE_HEIR}
        back={true}
      />

      {mode === "create" ? (
        <CreateHeirForm />
      ) : mode === "update" ? (
        <UpdateHeirForm />
      ) : null}
    </section>
  );
};

export default Heir;
