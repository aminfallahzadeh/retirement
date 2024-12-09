// IMPORTS
import { SearchPersonnel } from "./forms";

const PersonnelStatements = () => {
  const content = (
    <section className="flex-col u-margin-bottom-md">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>احکام و تعرفه
        </h4>
      </div>

      <SearchPersonnel />
    </section>
  );
  return content;
};

export default PersonnelStatements;
