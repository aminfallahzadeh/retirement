// IMPORTS
import { GlobalSearch } from "@/shared/components/GlobalSearch";
import { personnelActions } from "./actions";
import { Title } from "@/shared/components/Title";
import { STATEMENTS_AND_TARIFF } from "@/constants/const";

const StatementsAndTariff = () => {
  const content = (
    <section className="flex-col u-margin-bottom-md">
      <Title title={STATEMENTS_AND_TARIFF} back={true} />

      <GlobalSearch actions={personnelActions} />
    </section>
  );
  return content;
};

export default StatementsAndTariff;
