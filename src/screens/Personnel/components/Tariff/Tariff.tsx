// IMPORTS
import { PersonnelTariffGrid } from "../PersonnelTariffGrid";
import { PersonnelFractionGrid } from "../PersonnelFractionGrid";

const Tariff = () => {
  // STATES

  // CONTENT
  const content = (
    <>
      <PersonnelTariffGrid />
      <PersonnelFractionGrid />
    </>
  );

  return content;
};

export default Tariff;
