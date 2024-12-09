// IMPORTS
import { Title } from "@/shared/components/Title";
import { SlipsForm } from "./forms";
import { SLIPS_PAYS } from "@/constants/const";

export const Slips = () => {
  const content = (
    <section className="flex-col mb-5">
      <Title title={SLIPS_PAYS} back={true} />

      <SlipsForm />
    </section>
  );
  return content;
};
