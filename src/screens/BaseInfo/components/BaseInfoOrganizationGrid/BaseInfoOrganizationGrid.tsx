// IMPORTS
import { useState } from "react";
import { Grid } from "@/shared/components/Grid";
import { BaseInfoOrganization } from "./types";
import { baseInfoOrganizationColumns } from "./columns";

export const BaseInfoOrganizationGrid = () => {
  // STATES
  const [tableData, setTableData] = useState<BaseInfoOrganization[]>([]);

  // CONTENT
  const columns = baseInfoOrganizationColumns();
  const content = <Grid data={tableData} columns={columns} scroll={false} />;
  return content;
};
