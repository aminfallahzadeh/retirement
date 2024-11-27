// IMPORTS
import { useEffect, useState, useCallback } from "react";
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
    refetch: structureRefetch,
  } = useGetArchiveStructureQuery();

  const {
    data: archiveFiles,
    isLoading: isArchiveFilesLoading,
    isSuccess: isArchiveFilesSuccess,
    refetch: filesRefetch,
  } = useGetArchiveQuery(personID);

  useEffect(() => {
    if (isArchiveFilesSuccess) {
      setFiles(archiveFiles.itemList);
    }
  }, [isArchiveFilesSuccess, archiveFiles]);

  useEffect(() => {
    if (isArchiveStructureSuccess) {
      const tree = createTree(archiveStructure.itemList);
      setStructure(tree);
    }
  }, [isArchiveStructureSuccess, archiveStructure]);

  // HANDLERS
  const handleRefetch = useCallback(() => {
    structureRefetch();
    filesRefetch();
  }, [structureRefetch, filesRefetch]);

  return (
    <FileTree
      structure={structure}
      files={files}
      isLoading={isArchiveStructureLoading || isArchiveFilesLoading}
      refetch={handleRefetch}
      access="all"
    />
  );
};
