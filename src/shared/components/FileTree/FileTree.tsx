// IMPORTS
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { CustomTreeItem, Actions } from "./sub";
import { ArchiveStructure, Archive } from "@/shared/types/archive";
import { generateTreeSchema } from "./schema";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { useEffect } from "react";

export const FileTree = ({
  structure,
  files,
  isLoading,
}: {
  structure: ArchiveStructure[];
  files?: Archive[];
  isLoading: boolean;
}) => {
  const items = generateTreeSchema(structure, files);

  useEffect(() => {
    console.log("ITEMS:", items);
  }, [items]);

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const content = isLoading ? (
    <Stack sx={{ width: 400, marginTop: 2 }} spacing={2}>
      <LinearProgress color="primary" />
      <LinearProgress color="primary" />
      <LinearProgress color="primary" />
      <LinearProgress color="primary" />
      <LinearProgress color="primary" />
    </Stack>
  ) : (
    <Stack>
      <Actions />
      <CacheProvider value={cacheRtl}>
        <RichTreeView
          items={items}
          // defaultExpandedItems={["97134493291b473f9b3bf8c4c15b27a0"]}
          sx={{
            height: "fit-content",
            flexGrow: 1,
            maxWidth: 400,
            overflowY: "auto",
            backgroundColor: "#cfcfcf",
            borderRadius: "6px",
            padding: "5px",
          }}
          slots={{ item: CustomTreeItem }}
        />
      </CacheProvider>
    </Stack>
  );

  return content;
};
