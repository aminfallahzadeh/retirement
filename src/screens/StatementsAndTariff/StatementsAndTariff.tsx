// IMPORTS
import { GlobalSearch } from "@/shared/components/GlobalSearch";
import { personnelActions } from "./actions";

const StatementsAndTariff = () => {
  const content = (
    <section className="flex-col u-margin-bottom-md">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>احکام و تعرفه
        </h4>
      </div>

      <GlobalSearch actions={personnelActions} />
    </section>
  );
  return content;
};

export default StatementsAndTariff;
