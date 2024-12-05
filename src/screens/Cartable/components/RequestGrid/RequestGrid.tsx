// IMPORTS
import { useCallback, useEffect, useState } from "react";
import { RoleDataType } from "@/shared/types/role";
import { Request, RequestTableData } from "./types";
import { setRole } from "@/features/request/roleSlice";
import {
  useLazyGetRoleQuery,
  useLazyGetRequestQuery,
} from "@/features/request/requestApi";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hooks/usePreTypesHooks";
import { Grid } from "@/shared/components/Grid";
import Skeleton from "react-loading-skeleton";
import { columnsRenderer } from "./columns";
import { topBarActionsProvider } from "./actions";

export const RequestGrid = () => {
  // STATES
  const [requestTableData, setRequestTableData] = useState<RequestTableData>(
    []
  );
  const [allRoles, setAllRoles] = useState<RoleDataType["itemList"]>([]);

  // CONSTS
  const dispatch = useDispatch();
  const { role } = useAppSelector((state) => state.role);
  const [getRoles, { isLoading: isRolesLoading, isFetching: isRolesFetching }] =
    useLazyGetRoleQuery();
  const [
    getRequests,
    { isLoading: isRequestsLoading, isFetching: isRequestsFetching },
  ] = useLazyGetRequestQuery();

  // FETCH DATA
  const fetchRoles = useCallback(async () => {
    try {
      const res = await getRoles().unwrap();
      dispatch(
        setRole({
          value: res?.itemList[0].url,
          label: res?.itemList[0].itemName,
        })
      );
      setAllRoles(res?.itemList);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, getRoles]);

  const fetchRequests = useCallback(
    async (Role: string) => {
      try {
        const res = await getRequests({ Role }).unwrap();
        const mappedData = res?.itemList.map(
          (item: Request, index: number) => ({
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
      dispatch(setRole(null));
    };
  }, [dispatch]);

  useEffect(() => {
    if (role) {
      fetchRequests(role?.value);
    }
  }, [role, fetchRequests]);

  // HANDLERS
  const handleRefresh = () => {
    if (role) {
      fetchRequests(role?.value);
    }
  };

  const topBarActions = topBarActionsProvider({
    isLoading: isRequestsLoading,
    isFetching: isRequestsFetching,
    roles: allRoles,
    handleRefresh,
  });

  const columns = columnsRenderer({
    role,
  });

  const content = (
    <>
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
    </>
  );

  return content;
};
