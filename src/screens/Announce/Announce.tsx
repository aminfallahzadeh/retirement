// IMPORTS
import { Title } from "@/shared/components/Title";
import { INSERT_ANNOUNCE } from "@/constants/const";
import { InsertAnnounceForm } from "./forms";

const Announce = () => {
  return (
    <section className="flex-col u-margin-bottom-xl">
      <Title title={INSERT_ANNOUNCE} back={true} />

      <InsertAnnounceForm />
    </section>
  );
};

export default Announce;
