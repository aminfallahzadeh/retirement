// IMPORTS
import { Title } from "@/shared/components/Title";
import { RequestTabs } from "./components/RequestTabs";
import { REQUEST_INFO } from "@/constants/const";

const Request = () => {
  // CONTENT
  const content = (
    <section className="flex-col mb-20">
      <Title title={REQUEST_INFO} back={true} />

      <RequestTabs />
    </section>
  );

  return content;
};

export default Request;
