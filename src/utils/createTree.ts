// IMPORTS
import { ArchiveStructure } from "@/shared/types/archive";

export const createTree = (data: ArchiveStructure[]) => {
  const itemMap: {
    [key: string]: ArchiveStructure & { children: ArchiveStructure[] };
  } = {};

  /**
   * Create a mapping of items by their ID
   */
  data.forEach((item: ArchiveStructure) => {
    itemMap[item.id] = { ...item, children: [] };
  });

  /**
   * Recursive function to build the nested structure
   */
  const buildTree = (
    parentID: string
  ): (ArchiveStructure & { children: ArchiveStructure[] })[] => {
    return Object.values(itemMap)
      .filter((item) => item.parentID === parentID)
      .map((item) => ({
        ...item,
        children: buildTree(item.id), // Recursively build children
      }));
  };

  /**
   * Start building the tree from top-level items (parentID === "0")
   */
  return buildTree("0");
};
