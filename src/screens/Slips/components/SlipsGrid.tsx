// IMPORTS
import { useState } from "react";
import { Grid } from "@/shared/components/Grid";
import { CustomModal } from "@/shared/components/CustomModal";
import { Slip } from "../types";
import { slipsColumns } from "./columns";
import useToggleState from "@/hooks/useToggleState";

// TEST
import EditPayItemsGrid from "@/grids/EditPayItemsGrid";
import SlipFormTemplate from "@/components/SlipFormTemplate";

export const SlipsGrid = ({
  data,
  isLoading,
  isFetching,
}: {
  data: Slip[];
  isLoading: boolean;
  isFetching: boolean;
}) => {
  // STATES
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showObserveModal, setShowObserveModal] = useState<boolean>(false);
  const [payID, setPayID] = useState<string>("");

  // HANDLERS
  const handleUpdateModalOpenChange = (id: string) => {
    setShowUpdateModal(true);
    setPayID(id);
  };

  const handleObserveModalOpenChange = (id: string) => {
    setShowObserveModal(true);
    setPayID(id);
  };

  const columns = slipsColumns(
    handleObserveModalOpenChange,
    handleUpdateModalOpenChange
  );

  return (
    <>
      {showUpdateModal && (
        <CustomModal
          open={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          title="ویرایش پرسنل"
        >
          <EditPayItemsGrid
            payID={payID}
            setIsEditModalOpen={setShowUpdateModal}
          />
        </CustomModal>
      )}

      {showObserveModal && (
        <CustomModal
          open={showObserveModal}
          onClose={() => setShowObserveModal(false)}
          title="ویرایش پرسنل"
        >
          <SlipFormTemplate payID={payID} />
        </CustomModal>
      )}
      <Grid
        columns={columns}
        scroll={false}
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </>
  );
};
