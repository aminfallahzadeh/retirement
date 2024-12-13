// IMPORTS
import { Title } from "@/shared/components/Title";
import { SlipsForm } from "./forms";
import {
  SLIPS_PAYS,
  PAY_AND_FRACTION,
  COMPARE_SALARY_REPORT,
} from "@/constants/const";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FractionAndPayment } from "@/shared/components/FractionAndPayment";
import { CompareSalaryReport } from "@/shared/components/CompareSalaryReport";

const Slips = () => {
  const content = (
    <section className="flex-col mb-5">
      <Title title={SLIPS_PAYS} back={true} />

      <SlipsForm />

      <div>
        <Accordion>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            {PAY_AND_FRACTION}
          </AccordionSummary>
          <AccordionDetails>
            <FractionAndPayment />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            {COMPARE_SALARY_REPORT}
          </AccordionSummary>
          <AccordionDetails>
            <CompareSalaryReport />
          </AccordionDetails>
        </Accordion>
      </div>
    </section>
  );
  return content;
};

export default Slips;
