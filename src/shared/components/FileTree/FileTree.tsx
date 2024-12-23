// IMPORTS
import { useState, useEffect, useMemo } from "react";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { useTreeViewApiRef } from "@mui/x-tree-view/hooks/useTreeViewApiRef";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { CustomTreeItem, Actions } from "./sub";
import { FileTreeProps, SelectedItem } from "./types";
import {
  Search as SearchIcon,
  QuestionMark as QuestionIcon,
} from "@mui/icons-material";
import { generateTreeSchema } from "./schema";
import { Stack, LinearProgress, IconButton } from "@mui/material";
import {
  Image as ImageIcon,
  Close as CloseIcon,
  BrokenImage,
} from "@mui/icons-material";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { filterTree } from "@/utils/filterTree";
import { PREVIEW, SEARCH, PREVIEW_DOCUMENT } from "@/constants/const";
import { ERROR_ON_PREVIEW, NO_RESULT_FOUND } from "@/constants/messages";
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
  const [isDataReady, setIsDataReady] = useState<boolean>(false);
  const [search, toggleSearch] = useState<boolean>(false);
  const [term, setTerm] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null);
  const apiRef = useTreeViewApiRef();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // CONSTS
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const items = generateTreeSchema(structure, files);
  //   const filteredItems = filterTree(items, term);
  const filteredItems = useMemo(() => filterTree(items, term), [items, term]);

  // HANDLERS
  const handelToggleSearch = () => {
    toggleSearch((prev) => !prev);
    setTerm("");
  };

  const handleRemoveTerm = () => {
    setTerm("");
  };

  const handleExpandedItemsChange = (
    _: React.SyntheticEvent,
    itemIds: string[]
  ) => {
    setExpandedItems(itemIds);
  };

  // EFFECTS
  useEffect(() => {
    if (items && items.length > 0) {
      setIsDataReady(true);
    }
  }, [items]);

  useEffect(() => {
    // expand parent found items
    const getExpandedItemIds = (items: TreeViewBaseItem[]): string[] => {
      return items.flatMap((item) =>
        item.children ? [item.id, ...getExpandedItemIds(item.children)] : []
      );
    };

    const expandedIds = getExpandedItemIds(filteredItems);
    setExpandedItems(expandedIds);

    if (!term) {
      setExpandedItems([]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term]);

  const onItemClick = (id: string) => {
    if (apiRef.current?.getItem) {
      const item = apiRef.current?.getItem(id);
      setSelectedItem(item);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  // PREVIEW SIDE EFFECT
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
    <Stack sx={{ width: 800 }}>
      <div className="flex flex-row gap-0 justify-start items-start">
        <IconButton
          aria-label="search"
          color="warning"
          onClick={handelToggleSearch}
        >
          <SearchIcon />
        </IconButton>

        <Actions access={access} item={selectedItem} refetch={refetch} />
      </div>

      {search && (
        <div className="flex flex-row w-[400px] gap-2 justify-start items-center relative">
          <input
            type="text"
            placeholder={SEARCH}
            className="w-[400px] outline-none border border-gray-300 rounded-md px-2 py-1 placeholder:text-sm"
            value={term}
            onChange={handleSearch}
          />

          {term ? (
            <div className="absolute top-[2px] left-1">
              <IconButton
                color="default"
                size="small"
                onClick={handleRemoveTerm}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          ) : null}
        </div>
      )}

      <div className="flex flex-row">
        <CacheProvider value={cacheRtl}>
          {filteredItems.length === 0 && isDataReady ? (
            <div className="flex flex-col justify-center items-center w-[400px]">
              <QuestionIcon color={"error"} sx={{ fontSize: "200px" }} />

              <span className="text-xl font-iranYekan font-medium">
                {NO_RESULT_FOUND}
              </span>
            </div>
          ) : (
            <RichTreeView
              items={filteredItems}
              apiRef={apiRef}
              onItemClick={(_, id) => onItemClick(id)}
              onExpandedItemsChange={handleExpandedItemsChange}
              expandedItems={expandedItems}
              sx={{
                height: "fit-content",
                flexGrow: 1,
                maxWidth: 400,
                overflowY: "auto",
                borderRadius: "6px",
                padding: "5px",
              }}
              slots={{ item: CustomTreeItem }}
            />
          )}
        </CacheProvider>

        {access === "all" || access === "files" ? (
          <div
            data-name="preview"
            className="h-[400px] w-[300px] border rounded-sm p-2 relative"
          >
            {!selectedItem?.attachment ? (
              <div className="w-full h-full flex flex-col justify-center items-center bg-gray-300 rounded-md p-2 gap-2">
                <ImageIcon color={"primary"} sx={{ fontSize: "5rem" }} />

                <span className="text-base text-gray-800">
                  {PREVIEW_DOCUMENT}
                </span>
              </div>
            ) : (
              <Img
                src={previewImage as string}
                alt={PREVIEW}
                className="w-full h-full rounded-md object-contain"
                fallback={
                  <div className="w-full h-full flex flex-col justify-center items-center bg-gray-300 rounded-md p-2 gap-2">
                    <BrokenImage color={"error"} sx={{ fontSize: "5rem" }} />

                    <span className="text-base text-red-500">
                      {ERROR_ON_PREVIEW}
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
