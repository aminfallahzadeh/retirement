// IMPORTS
import { useAppSelector } from "@/hooks/usePreTypesHooks";
import FractionForm from "@/forms/FractionForm";
import CalculateFractionForm from "@/forms/CalculateFractionForm";
import FractionPeriodGrid from "@/grids/FractionPeriodGrid";

const SubmitFraction = () => {
  // CONSTS
  const { fractionType } = useAppSelector((state) => state.fractionData);

  const content = (
    <>
      <FractionForm />
      {fractionType === "solo" && (
        <>
          <div className="flex-col flex-center">
            <h5 className="title-secondary">لیست دوره ها</h5>
          </div>
          <FractionPeriodGrid />
        </>
      )}

      <CalculateFractionForm />
    </>
  );
  return content;
};

export default SubmitFraction;
