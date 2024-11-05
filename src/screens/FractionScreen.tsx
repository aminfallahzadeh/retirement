// REACT IMPORTS
import { useEffect, useState } from "react";

// redux imports
import { useSelector, useDispatch } from "react-redux";
import { setPeriodsTableData } from "../slices/fractionDataSlice";
import { setData } from "../slices/calculateFractionDataSlice";

// MUI
import { Box, Tab, IconButton, Tooltip } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// COMPONENTS
import FractionForm from "@/forms/FractionForm";
import FractionPeriodGrid from "@/grids/FractionPeriodGrid";
import CalculateFractionForm from "@/forms/CalculateFractionForm";
import FractionFormSecondTab from "@/forms/FractionFormSecondTab";

function FractionScreen() {
  // TAB STATE
  const [value, setValue] = useState("1");

  // CONTORL STATE
  const { fractionType } = useSelector((state) => state.fractionData);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setPeriodsTableData([]));
      dispatch(setData({}));
    };
  }, [dispatch]);

  // HANDLERS
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const content = (
    <section className="flex-col u-margin-bottom-xl">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline">کسورات</span>
        </h4>
      </div>

      <div>
        <TabContext value={value}>
          <Box sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
            <TabList onChange={handleChange} aria-label="tabs">
              <Tab label="ثبت کسورات" value="1" />
              <Tab label="محاسبه کسورات" value="2" />
            </TabList>
          </Box>

          <TabPanel
            value="1"
            sx={{
              padding: "0",
            }}
          >
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
          </TabPanel>
          <TabPanel
            value="2"
            sx={{
              padding: "0",
            }}
          >
            <FractionFormSecondTab />
          </TabPanel>
        </TabContext>
      </div>
    </section>
  );
  return content;
}

export default FractionScreen;
