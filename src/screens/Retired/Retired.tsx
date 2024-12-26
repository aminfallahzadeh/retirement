// IMPORTS
import { Electronic } from "./components/Electronic";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { Title } from "@/shared/components/Title";
import {
  RETIRED_INFO,
  RETIRED_PERSON_INFO,
  RETIRES_PENSIONARY_INFO,
  RETIRED_ADDITIONAL_INFO,
  ELECTRONIC_CASE,
} from "@/constants/const";
import { PersonForm, PensionaryForm, AdditionalInfoForm } from "./forms";
import { RetiredTabs } from "./components/RetiredTabs";

const Retired = () => {
  // CONTENT
  const content = (
    <section className="flex-col mb-20">
      <Title title={RETIRED_INFO} back={true} />

      <div data-name="retired-forms">
        <Accordion>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            {RETIRED_PERSON_INFO}
          </AccordionSummary>
          <AccordionDetails>
            <PersonForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            {RETIRES_PENSIONARY_INFO}
          </AccordionSummary>
          <AccordionDetails>
            <PensionaryForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            {RETIRED_ADDITIONAL_INFO}
          </AccordionSummary>
          <AccordionDetails>
            <AdditionalInfoForm />
          </AccordionDetails>
        </Accordion>

        <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
          <AccordionSummary
            id="panel-header"
            aria-controls="panel-content"
            expandIcon={<ArrowDropDownIcon />}
          >
            {ELECTRONIC_CASE}
          </AccordionSummary>
          <AccordionDetails>
            <Electronic />
          </AccordionDetails>
        </Accordion>
      </div>

      <RetiredTabs />
    </section>
  );
  return content;
};

export default Retired;
