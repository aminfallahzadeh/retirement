// IMPORTS
import { BaseInfoForm } from "./forms";

const BaseInfo2 = () => {
  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>اطلاعات پایه ۲
        </h4>
      </div>

      <BaseInfoForm />
    </section>
  );
  return content;
};

export default BaseInfo2;
