// IMPORTS
import { useEffect, useState } from "react";
import { FileTree } from "@/shared/components/FileTree";
import { ArchiveStructure, Archive } from "@/shared/types/archive";
import {
  useGetArchiveStructureQuery,
  useGetArchiveQuery,
} from "@/features/archive/archiveApi";
import { createTree } from "@/utils/createTree";
import { useSearchParams } from "react-router-dom";

export const Electronic = () => {
  // STATES
  const [searchParams] = useSearchParams();
  const [structure, setStructure] = useState<ArchiveStructure[]>([]);
  const [files, setFiles] = useState<Archive[]>([]);

  // CONST
  const personID = searchParams.get("personID");

  const {
    data: archiveStructure,
    isLoading: isArchiveStructureLoading,
    isSuccess: isArchiveStructureSuccess,
  } = useGetArchiveStructureQuery();

  const {
    data: archiveFiles,
    isLoading: isArchiveFilesLoading,
    isSuccess: isArchiveFilesSuccess,
  } = useGetArchiveQuery(personID);

  useEffect(() => {
    if (isArchiveFilesSuccess) {
      console.log("FILES:", archiveFiles);
      setFiles(archiveFiles.itemList);
    }
  }, [isArchiveFilesSuccess, archiveFiles]);

  useEffect(() => {
    if (isArchiveStructureSuccess) {
      console.log("BEFORE CREATE TREE:", archiveStructure);
      const tree = createTree(archiveStructure.itemList);
      console.log("AFRET CREATE TREE:", tree);
      setStructure(tree);
    }
  }, [isArchiveStructureSuccess, archiveStructure]);

  return (
    <FileTree
      structure={structure}
      files={files}
      isLoading={isArchiveStructureLoading || isArchiveFilesLoading}
    />
  );
};
