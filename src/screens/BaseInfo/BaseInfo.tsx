// IMPORTS
import { Title } from "@/shared/components/Title";
import BaseInfoAccordions from "./components/BaseInfoAccordions";
import { BASE_INFO } from "@/constants/const";

const BaseInfo = () => {
  const content = (
    <section className="flex-col">
      <Title title={BASE_INFO} back={true} />

      <BaseInfoAccordions />
    </section>
  );
  return content;
};

export default BaseInfo;
