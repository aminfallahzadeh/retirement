// IMPORTS
import { useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { GlobalSearch } from "@/shared/components/GlobalSearch";
import { useLazyGetRetiredQuery } from "@/features/retired/retiredApi";
import { searchActions } from "./actions";
import { RetiredData } from "./types";
import { ResultForm } from "./forms";

export const SearchScreen = () => {
  // STATES
  const [data, setData] = useState<RetiredData>(null);

  // CONSTS
  const [getRetired, { isLoading, isFetching }] = useLazyGetRetiredQuery();

  // HANDLERS
  const fetchData = async (personID: string) => {
    const response = await getRetired(personID).unwrap();
    setData(response.itemList[0]);
  };

  return (
    <section className="flex-col">
      <GlobalSearch actions={searchActions(fetchData)} />

      {isLoading || isFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem 10rem",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        data && <ResultForm data={data} />
      )}
    </section>
  );
};
