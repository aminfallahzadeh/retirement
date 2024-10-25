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

// COMPONENTS
// import RequestsGrid from "@/grids/RequestsGrid";

// LIBRARIES
import { toast } from "react-toastify";

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

  const fetchRequests = useCallback(async (Role: string) => {
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
  }, []);

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

  return (
    <section className="flex-col">
      <div className="title-primary--container flex-row flex-center">
        <h4 className="title-primary">
          <span className="title-primary--underline"></span>کارتابل
        </h4>
      </div>

      {/* {selectedRole && (
        <RequestsGrid isLoading={isLoading || isFetching} roles={allRoles} />
      )} */}
    </section>
  );
}

export default CartableScreen;
