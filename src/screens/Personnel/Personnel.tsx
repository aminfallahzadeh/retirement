// IMPORTS
import { Title } from "@/shared/components/Title";
import { PersonnelInfo } from "./components/PersonnelInfo";
import { PERSONNEL_INFO } from "@/constants/const";
import { PersonnelTabs } from "@/screens/Personnel/components/PersonnelTabs/PersonnelTabs";

function Personnel() {
  const content = (
    <section className="flex-col u-margin-bottom-md">
      <Title title={PERSONNEL_INFO} back={true} />

      <PersonnelInfo />
      <PersonnelTabs />
    </section>
  );
  return content;
}

export default Personnel;
