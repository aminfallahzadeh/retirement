// REACT IMPORTS
import { useState } from "react";

// MUI
import { Box, Tab, IconButton, Tooltip } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// COMPONETNS
import ReportGeneratorTableForm from "../forms/ReportGeneratorTableForm";

function ReportGeneratorScreen() {
  // TAB STATE
  const [value, setValue] = useState("1");

  // HANDLERS
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const content = (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline">گزارش ساز</span>
        </h4>
      </div>

      <div>
        <TabContext value={value}>
          <Box sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
            <TabList onChange={handleChange} aria-label="tabs">
              <Tab label="گزارش جدید" value="1" />
              <Tab label="گزارش های ثبت شده" value="2" />
            </TabList>
          </Box>

          <TabPanel
            value="1"
            sx={{
              padding: "0",
            }}
          >
            <ReportGeneratorTableForm />
          </TabPanel>

          <TabPanel
            value="2"
            sx={{
              padding: "0",
            }}
          ></TabPanel>
        </TabContext>
      </div>
    </section>
  );
  return content;
}

export default ReportGeneratorScreen;
