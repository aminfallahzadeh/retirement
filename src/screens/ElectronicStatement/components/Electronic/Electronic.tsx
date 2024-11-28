import { useEffect, useState, useCallback } from "react";
import { FileTree } from "@/shared/components/FileTree";
import { ArchiveStructure } from "@/shared/types/archive";
import { useGetArchiveStructureQuery } from "@/features/archive/archiveApi";
import { createTree } from "@/utils/createTree";

export const Electronic = () => {
  // STATES
  const [structure, setStructure] = useState<ArchiveStructure[]>([]);

  const {
    data: archiveStructure,
    isLoading: isArchiveStructureLoading,
    isSuccess: isArchiveStructureSuccess,
    refetch: structureRefetch,
  } = useGetArchiveStructureQuery();

  useEffect(() => {
    if (isArchiveStructureSuccess) {
      const tree = createTree(archiveStructure.itemList);
      setStructure(tree);
    }
  }, [isArchiveStructureSuccess, archiveStructure]);

  // HANDLERS
  const handleRefetch = useCallback(() => {
    structureRefetch();
  }, [structureRefetch]);

  return (
    <FileTree
      structure={structure}
      isLoading={isArchiveStructureLoading}
      refetch={handleRefetch}
      access="folders"
    />
  );
};
