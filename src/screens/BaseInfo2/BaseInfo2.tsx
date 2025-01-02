// IMPORTS
import { BaseInfoForm } from "./forms";
import { Title } from "@/shared/components/Title";
import { BASE_INFO_2 } from "@/constants/const";

const BaseInfo2 = () => {
  const content = (
    <section className="flex-col">
      <Title title={BASE_INFO_2} back={true} />

      <BaseInfoForm />
    </section>
  );
  return content;
};

export default BaseInfo2;
