// IMPORTS
import PersonnelInfoForm from "@/forms/PersonnelInfoForm";
import PersonnelGridsSection from "@/sections/personnel/PersonnelGridsSection";
import { Title } from "@/shared/components/Title";
import { PERSONNEL_INFO } from "@/constants/const";

function Personnel() {
  const content = (
    <section className="flex-col u-margin-bottom-md">
      <Title title={PERSONNEL_INFO} back={true} />

      <PersonnelInfoForm />
      <PersonnelGridsSection />
    </section>
  );
  return content;
}

export default Personnel;
