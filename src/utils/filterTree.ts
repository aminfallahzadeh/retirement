// IMPORTS
import { TreeViewBaseItem } from "@mui/x-tree-view";
import { convertToEnglishNumber } from "@/helper";

/**
 * Recursively filters a tree of items based on a search term.
 *
 * @param {TreeViewBaseItem[]} items - The array of tree items to filter. Each item can have children.
 * @param {string} term - The search term to filter items by. Matches are case-insensitive.
 * @returns {TreeViewBaseItem[]} - A filtered array of tree items, including only items that match the search term
 * and their parent nodes if they have matching children.
 *
 * @example
 * const items = [
 *   { id: '1', label: 'Parent', children: [
 *     { id: '2', label: 'Child', children: [] }
 *   ]}
 * ];
 *
 * const result = filterTree(items, 'child');
 * // result: [
 * //   { id: '1', label: 'Parent', children: [
 * //     { id: '2', label: 'Child', children: [] }
 * //   ]}
 * // ]
 */
export const filterTree = (
  items: TreeViewBaseItem[],
  term: string
): TreeViewBaseItem[] => {
  const translatedTerm = convertToEnglishNumber(term);

  // return original items if no match found
  if (!translatedTerm.trim()) return items;

  return items
    .map((item) => {
      if (item.label.toLowerCase().includes(translatedTerm.toLowerCase())) {
        return item; // Include the item if it matches
      }

      if (item.children) {
        const filteredChildren = filterTree(item.children, translatedTerm);
        if (filteredChildren.length > 0) {
          return { ...item, children: filteredChildren }; // Include item with filtered children
        }
      }
      return null; // Exclude item if no match
    })
    .filter((item): item is TreeViewBaseItem => item !== null);
};
