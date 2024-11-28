// IMPROTS
import RetiredAccountForm from "@/forms/RetiredAccountForm";
import RetiredPensionaryForm from "@/forms/RetiredPensionaryForm";
import RetiredPersonForm from "@/forms/RetiredPersonForm";
import { Electronic } from "./components/Electronic";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ArrowDropDown as ArrowDropDownIcon } from "@mui/icons-material";
import { NavigateBack } from "@/shared/components/NavigateBack";
import {
  RETIRED_INFO,
  RETIRED_PERSON_INFO,
  RETIRES_PENSIONARY_INFO,
  RETIRED_ADDITIONAL_INFO,
  ELECTRONIC_CASE,
  RELATEDS,
  HEIRS,
  STATEMENTS,
  PAYSLIP,
  REQUESTS,
} from "@/constants/const";
import { useState } from "react";
import { useAppSelector } from "@/hooks/usePreTypesHooks";
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import RetiredRelatedGrid from "@/grids/RetiredRelatedGrid";
import RetiredStatementsGrid from "@/grids/RetiredStatementsGrid";
import RetiredHeirGrid from "@/grids/RetiredHeirGrid";
import AllRequestsGrid from "@/grids/AllRequestsGrid";
import RetiredSlipsGrid from "@/grids/RetiredSlipsGrid";

export const Retired = () => {
  const [value, setValue] = useState("1");

  const { personDeathDate } = useAppSelector((state) => state.retiredState);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const content = (
    <section className="flex-col">
      <NavigateBack title={RETIRED_INFO} />

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
            <RetiredPersonForm />
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
            <RetiredPensionaryForm />
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
            <RetiredAccountForm />
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

      <div data-name="retired-grids">
        <TabContext value={value}>
          <Box
            sx={{
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="tabs"
              variant="fullWidth"
            >
              <Tab label={personDeathDate ? HEIRS : RELATEDS} value="1" />
              <Tab label={STATEMENTS} value="2" />
              <Tab label={PAYSLIP} value="3" />
              <Tab label={REQUESTS} value="4" />
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{
              padding: "0",
            }}
          >
            {personDeathDate ? <RetiredHeirGrid /> : <RetiredRelatedGrid />}
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              padding: "0",
            }}
          >
            <RetiredStatementsGrid />
          </TabPanel>
          <TabPanel
            value="3"
            sx={{
              padding: "0",
            }}
          >
            <RetiredSlipsGrid />
          </TabPanel>
          <TabPanel
            value="4"
            sx={{
              padding: "0",
            }}
          >
            <AllRequestsGrid />
          </TabPanel>
        </TabContext>
      </div>
    </section>
  );
  return content;
};
