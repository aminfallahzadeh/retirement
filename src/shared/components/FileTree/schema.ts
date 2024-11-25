// IMPORTS
import { ArchiveStructure, Archive } from "@/shared/types/archive";
import { Tree, FileType } from "./types";

/**
 * Generate tree view items based on a given data structure.
 * @param structure - Array of ArchiveStructure objects.
 * @returns Array of TreeViewBaseItem objects.
 *
 * BASE SCHEMA:
 * const ITEMS: TreeViewBaseItem<ExtendedTreeItemProps>[] = [
 *   {
 *     id: "1",
 *     label: "Documents",
 *     children: [
 *       {
 *         id: "1.1",
 *         label: "Company",
 *         children: [
 *           { id: "1.1.1", label: "Invoice", fileType: "pdf" },
 *           { id: "1.1.2", label: "Meeting notes", fileType: "doc" },
 *           { id: "1.1.3", label: "Tasks list", fileType: "doc" },
 *           { id: "1.1.4", label: "Equipment", fileType: "pdf" },
 *           { id: "1.1.5", label: "Video conference", fileType: "video" },
 *         ],
 *       },
 *       { id: "1.2", label: "Personal", fileType: "folder" },
 *       { id: "1.3", label: "Group photo", fileType: "image" },
 *     ],
 *   },
 *   {
 *     id: "2",
 *     label: "Bookmarked",
 *     fileType: "pinned",
 *     children: [
 *       { id: "2.1", label: "Learning materials", fileType: "folder" },
 *       { id: "2.2", label: "News", fileType: "folder" },
 *       { id: "2.3", label: "Forums", fileType: "folder" },
 *       { id: "2.4", label: "Travel documents", fileType: "pdf" },
 *     ],
 *   },
 *   { id: "3", label: "History", fileType: "folder" },
 *   { id: "4", label: "Trash", fileType: "trash" },
 * ];
 */

export const generateTreeSchema = (
  structure: ArchiveStructure[],
  files: Archive[] = []
): Tree[] => {
  // Helper to match files to the parent folder
  const getFilesForFolder = (folderId: string) =>
    files
      .filter((file) => file.archiveStructureID === folderId)
      .map((file) => ({
        id: file.id,
        label: file.documentID || "فاقد شماره",
        attatchment: file.attachment,
        fileType: "image" as FileType,
      }));

  const tree = structure.map((item) => ({
    id: item.id,
    label: item.name,
    fileType: "folder" as FileType,
    children: [
      ...(item.children ? generateTreeSchema(item.children, files) : []),
      ...getFilesForFolder(item.id),
    ],
  }));

  return tree;
};
