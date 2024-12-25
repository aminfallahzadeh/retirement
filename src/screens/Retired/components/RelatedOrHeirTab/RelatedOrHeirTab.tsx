// IMPORTS
import { useAppSelector } from "@/hooks/usePreTypesHooks";
import { RelatedGrid } from "../RelatedGrid";
import { HeirGrid } from "../HeirGrid";

const RelatedOrHeirTab = () => {
  // CONSTS
  const { personDeathDate } = useAppSelector((state) => state.person);

  return personDeathDate ? <HeirGrid /> : <RelatedGrid />;
};

export default RelatedOrHeirTab;
