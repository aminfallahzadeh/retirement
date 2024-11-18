// IMPORTS
import { RequestGrid } from "./components/RequestGrid";

export const Cartable = () => {
  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>کارتابل
        </h4>
      </div>

      <RequestGrid />
    </section>
  );
};
