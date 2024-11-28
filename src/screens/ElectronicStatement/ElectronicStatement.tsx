// IMPORTS
import { Electronic } from "./components/Electronic";

export const ElectronicStatement = () => {
  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>پرونده الکترونیک
        </h4>
      </div>

      <div className="formContainer">
        <Electronic />
      </div>
    </section>
  );
  return content;
};
