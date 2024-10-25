// REACT IMPORTS
import { useCallback, useEffect, useState } from "react";

// TYPES
import { ApiError } from "@/types/ApiErrorTypes";
import { RoleDataType } from "@/types/RoleDataType";
import { RequestType } from "@/types/RequestTypes";

// REDUX
import { setSelectedRole } from "@/slices/roleDataSlice";
import { useLazyGetRoleQuery, useLazyGetRequestQuery } from "@/api/request";
import { useDispatch } from "react-redux";

// HOOKS
import { useAppSelector } from "@/hooks/usePreTypesHooks";
import useCreateColumns from "@/hooks/useCreateColumns";

// COMPONENTS
// import RequestsGrid from "@/grids/RequestsGrid";
import Grid from "@/components/Grid";

// LIBRARIES
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

// SCHEMAS
import { requestSchema as columnDefs } from "@/schemas/requestSchema.js";

// DATA
import { requestCellRenderer } from "@/data/grid-cells/requestCellRenderer";
import { requestGridActionsRenderer } from "@/data/grid-actions/requestGridActions";

function CartableScreen() {
  // MAIN STATE
  const [requestTableData, setRequestTableData] = useState<any>([]);

  const dispatch = useDispatch();
  const [allRoles, setAllRoles] = useState<RoleDataType["itemList"]>([]);

  const { selectedRole } = useAppSelector((state) => state.roleData);

  // ACCESS QUERIES
  const [getRoles, { isLoading: isRolesLoading, isFetching: isRolesFetching }] =
    useLazyGetRoleQuery();
  const [
    getRequests,

    { isLoading: isRequestsLoading, isFetching: isRequestsFetching },
  ] = useLazyGetRequestQuery();

  // FETCH LOGICS
  const fetchRoles = useCallback(async () => {
    try {
      const res = await getRoles().unwrap();
      dispatch(
        setSelectedRole({
          value: res?.itemList[0].url,
          label: res?.itemList[0].itemName,
        })
      );
      setAllRoles(res?.itemList);
    } catch (error) {
      console.log(error);
      const apiError = error as ApiError;
      toast.error(apiError.data?.message || apiError.error, {
        autoClose: 2000,
      });
    }
  }, [dispatch, getRoles]);

  const fetchRequests = useCallback(
    async (Role: string) => {
      try {
        const res = (await getRequests({ Role }).unwrap()) as any;
        const mappedData = res?.itemList.map(
          (item: RequestType, index: number) => ({
            id: item.requestID,
            requestRowNum: index + 1,
            requestNO: item.requestNO || "-",
            requestTypeID: item.requestTypeID,
            personID: item.personID,
            requestTypeNameFa: item.requestTypeNameFa,
            personName: item.personFirstName + " " + item.personLastName || "-",
            date: item.requestDate,
            body: item.requestText,
          })
        );

        setRequestTableData(mappedData);
      } catch (error) {
        console.log(error);
        const apiError = error as ApiError;
        toast.error(apiError.data?.message || apiError.error, {
          autoClose: 2000,
        });
      }
    },
    [getRequests]
  );

  // SIDE EFFECTS
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  useEffect(() => {
    return () => {
      dispatch(setSelectedRole(null));
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedRole) {
      fetchRequests(selectedRole?.value);
    }
  }, [selectedRole, fetchRequests]);

  // HANDLERS
  const handleRefresh = () => {
    fetchRequests(selectedRole?.value);
  };

  const customCellRenderers = requestCellRenderer(selectedRole);

  const topBarActions = requestGridActionsRenderer({
    isLoading: isRequestsLoading,
    isFetching: isRequestsFetching,
    roles: allRoles,
    handleRefresh,
  });

  const columns = useCreateColumns({
    columnDefs,
    customCellRenderers,
    dependencies: [selectedRole?.value],
  });

  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>کارتابل
        </h4>
      </div>

      {isRequestsLoading ||
      isRequestsFetching ||
      isRolesFetching ||
      isRolesLoading ? (
        <div className="skeleton-lg">
          <Skeleton
            count={5}
            baseColor="#dfdfdf"
            highlightColor="#9f9f9f"
            duration={1}
            direction="rtl"
          />
        </div>
      ) : (
        <Grid
          columns={columns}
          data={requestTableData}
          topBarActions={topBarActions}
          scroll={false}
        />
      )}
    </section>
  );
}

export default CartableScreen;
