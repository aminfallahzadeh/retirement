// IMPORTS
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import BaseOrganizationForm from "../forms/BaseOrganizationForm";
import { ORGANIZATION_BASE_INFO } from "@/constants/consts/base-info";

const BaseInfoAccordions = () => {
  // CONTENT
  const content = (
    <div>
      <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
        <AccordionSummary
          id="panel-header"
          aria-controls="panel-content"
          expandIcon={<ArrowDropDownIcon />}
        >
          {ORGANIZATION_BASE_INFO}
        </AccordionSummary>
        <AccordionDetails>
          <BaseOrganizationForm />
        </AccordionDetails>
      </Accordion>
    </div>
  );
  return content;
};

export default BaseInfoAccordions;
