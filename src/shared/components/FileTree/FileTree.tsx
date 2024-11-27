// IMPORTS
import { useState } from "react";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks/useTreeViewApiRef";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { CustomTreeItem, Actions } from "./sub";
import { FileTreeProps, SelectedItem } from "./types";
import { generateTreeSchema } from "./schema";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { PARENT_FOLDER_ID } from "@/constants/const";

export const FileTree = ({
  structure,
  files,
  isLoading,
  access,
  refetch,
}: FileTreeProps) => {
  // STATES
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const apiRef = useTreeViewApiRef();
  const [expandedItems, setExpandedItems] = useState<string[]>([
    PARENT_FOLDER_ID,
  ]);

  // CONSTS
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const items = generateTreeSchema(structure, files);

  // HANDLERS
  const handleExpandedItemsChange = (
    _: React.SyntheticEvent,
    itemIds: string[]
  ) => {
    const restrictedItemId = PARENT_FOLDER_ID;
    const expandeds = itemIds.includes(restrictedItemId)
      ? itemIds
      : [...itemIds, restrictedItemId];

    console.log("Updated expanded item IDs:", expandeds);
    setExpandedItems(expandeds);
  };

  const onItemClick = (id: string) => {
    if (apiRef.current?.getItem) {
      const item = apiRef.current?.getItem(id);
      setSelectedItem(item);
    }
  };

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
      <Actions access={access} item={selectedItem} refetch={refetch} />
      <CacheProvider value={cacheRtl}>
        <RichTreeView
          items={items}
          apiRef={apiRef}
          onItemClick={(_, id) => onItemClick(id)}
          onExpandedItemsChange={handleExpandedItemsChange}
          expandedItems={expandedItems}
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
