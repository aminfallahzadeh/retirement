// IMPROTS
import IndividualInfoSection from "@/sections/retired/IndividualInfoSection";
import RelatedInfoSection from "@/sections/retired/RelatedInfoSection";
import { NavigateBack } from "@/shared/components/NavigateBack";
import { RETIRED_INFO } from "@/constants/const";

function RetiredScreen() {
  return (
    <section className="flex-col">
      <NavigateBack title={RETIRED_INFO} />

      <IndividualInfoSection />
      <RelatedInfoSection />
    </section>
  );
}

export default RetiredScreen;
