// IMPORTS
import { RequestGrid } from "./components/RequestGrid";
import { Title } from "@/shared/components/Title";
import { CARTABLE } from "@/constants/const";

export default function Cartable() {
  return (
    <section className="flex-col">
      <Title title={CARTABLE} back={false} />

      <RequestGrid />
    </section>
  );
}
