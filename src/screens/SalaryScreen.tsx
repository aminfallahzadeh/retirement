// IMPORTS
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { CompareSalaryReport } from "@/shared/components/CompareSalaryReport";
import {
  SALARY_AND_WAGE,
  PAY_AND_FRACTION,
  COMPARE_SALARY_REPORT,
} from "@/constants/const";
import { Title } from "@/shared/components/Title";
import { FractionAndPayment } from "@/shared/components/FractionAndPayment";

function SalaryScreen() {
  const content = (
    <section className="flex-col mb-5">
      <Title title={SALARY_AND_WAGE} back={true} />

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
}

export default SalaryScreen;
