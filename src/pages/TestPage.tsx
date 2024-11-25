// IMPORTS
import { useEffect, useState } from "react";
import { FileTree } from "@/shared/components/FileTree";
import { ArchiveStructure } from "@/shared/types/archive";
import {
  useGetArchiveStructureQuery,
  useDeleteArchiveStructureMutation,
  useGetArchiveQuery,
  useDeleteArchiveMutation,
} from "@/features/archive/archiveApi";
import { createTree } from "@/utils/createTree";

const TestPage = () => {
  const [data, setData] = useState<ArchiveStructure[]>([]);
  const {
    data: archiveStructure,
    isLoading,
    isSuccess,
    refetch,
  } = useGetArchiveStructureQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log("BEFORE CREATE TREE:", archiveStructure);
      const tree = createTree(archiveStructure.itemList);
      console.log("AFRET CREATE TREE:", tree);
      setData(tree);
    }
  }, [isSuccess, archiveStructure]);

  return <FileTree data={data} />;
};

export default TestPage;
