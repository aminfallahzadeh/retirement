// IMPORTS
import { useState, useEffect } from "react";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks/useTreeViewApiRef";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { CustomTreeItem, Actions } from "./sub";
import { FileTreeProps, SelectedItem } from "./types";
import { generateTreeSchema } from "./schema";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { Image as ImageIcon, BrokenImage } from "@mui/icons-material";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { PARENT_FOLDER_ID, PREVIEW } from "@/constants/const";
import { fixAttachment } from "@/utils/fixAttachment";
import { Img } from "../Img";
export const FileTree = ({
  structure,
  files,
  isLoading,
  access,
  refetch,
}: FileTreeProps) => {
  // STATES
  const [previewImage, setPreviewImage] = useState<string | null>(null);
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

  // PREVIEW SIDE EFFETC
  useEffect(() => {
    if (selectedItem && selectedItem.attachment) {
      const image = fixAttachment(selectedItem.attachment);
      setPreviewImage(image);
    }
  }, [selectedItem]);

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

      <div className="flex flex-row">
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

        {access === "all" || access === "files" ? (
          <div
            data-name="preview"
            className="h-[400px] w-[300px] border rounded-sm p-2 relative"
          >
            {!selectedItem?.attachment ? (
              <div className="w-full h-full flex flex-col justify-center items-center bg-gray-300 rounded-md p-2 gap-2">
                <ImageIcon color={"primary"} sx={{ fontSize: "5rem" }} />

                <span className="text-base text-gray-800">پیش نمایش سند</span>
              </div>
            ) : (
              <Img
                src={previewImage as string}
                alt={PREVIEW}
                className="w-full h-full object-cover rounded-md"
                fallback={
                  <div className="w-full h-full flex flex-col justify-center items-center bg-gray-300 rounded-md p-2 gap-2">
                    <BrokenImage color={"error"} sx={{ fontSize: "5rem" }} />

                    <span className="text-base text-red-500">
                      خطا در پیش نمایش
                    </span>
                  </div>
                }
              />
            )}
          </div>
        ) : null}
      </div>
    </Stack>
  );
  return content;
};
