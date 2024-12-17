// IMPORTS
import { CreateRequestForm } from "./forms";
import { Title } from "@/shared/components/Title";
import { CREATE_REQUEST } from "@/constants/const";

const CreateRequest = () => {
  const content = (
    <section className="flex-col">
      <Title title={CREATE_REQUEST} back={true} />

      <CreateRequestForm />
    </section>
  );

  return content;
};

export default CreateRequest;
