// IMPORTS
import CalculateFractionStepOne from "../../forms/CalculateFractionStepOne";
import CalculateFractionStepTwo from "../../forms/CalculateFractionStepTwo";
import { useParams } from "react-router-dom";

const CalculateFraction = () => {
  // CONSTS
  const { step } = useParams();

  const renderContent = (step: string | undefined) => {
    switch (step) {
      case "1":
        return <CalculateFractionStepOne />;
        break;

      case "2":
        return <CalculateFractionStepTwo />;
        break;

      default:
        return null;
    }
  };

  const content = renderContent(step);

  return content;
};

export default CalculateFraction;
