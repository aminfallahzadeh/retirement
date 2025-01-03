// IMPORTS
import { useState, useEffect } from "react";
import {
  useGetLookupDataQuery,
  useGetPensionaryStatusQuery,
  useGetRelationshipQuery,
  useGetRetiredOrganizationQuery,
  useGetRetirementStatementTypeQuery,
  useGetPayItemTypeQuery,
} from "@/features/shared/sharedApi";
import { useGetRequestTypeQuery } from "@/features/request/requestApi";
import { useGetPersonnelStatementOffTypeQuery } from "@/features/personnel/personnelApi";
import { useGetFractionTypeQuery } from "@/features/fraction/fractionApi";
import { useGetRequestTypeAttachmentQuery } from "@/features/request/requestApi";
import { useGetTablesQuery } from "@/features/report-generator/reportGeneratorApi";

// COMMON LOOK UP DATA LOGIC
/**
 * Custom hook to fetch lookup data based on the specified type.
 *
 * @param {Object} params - Parameters for the hook.
 * @param {string} params.lookUpType - The type of lookup data to fetch.
 *
 * @returns {Object} An object containing the following properties:
 * - `lookUpItems` {Array}: The list of fetched lookup items.
 * - `lookUpItemsIsLoading` {boolean}: A flag indicating if the data is currently loading.
 * - `lookUpItemsIsFetching` {boolean}: A flag indicating if the data is being fetched.
 */
const useFetchLookUpData = ({ lookUpType }: { lookUpType: string }) => {
  const [lookUpItems, setLookUpItems] = useState([]);

  // GET DATA
  const {
    data: lookUpItemsData,
    isSuccess: lookUpItemsIsSuccess,
    isLoading: lookUpItemsIsLoading,
    isFetching: lookUpItemsIsFetching,
    error: lookUpItemsError,
  } = useGetLookupDataQuery({ lookUpType });

  // FETCH DATA
  useEffect(() => {
    if (lookUpItemsIsSuccess) {
      setLookUpItems(lookUpItemsData.itemList);
    }
  }, [lookUpItemsIsSuccess, lookUpItemsData]);

  // HANDLE ERROR
  useEffect(() => {
    if (lookUpItemsError) {
      console.log(lookUpItemsError);
    }
  }, [lookUpItemsError]);

  return {
    lookUpItems,
    lookUpItemsIsLoading,
    lookUpItemsIsFetching,
  };
};

// STATEMENT TYPES LOOK UP LOGIC
const useFetchRetirementStatementTypes = () => {
  const [statementTypes, setStatementTypes] = useState([]);

  // GET DATA
  const {
    data: statementTypesItems,
    isSuccess: statementTypesIsSuccess,
    isFetching: statementTypesIsFetching,
    isLoading: statementTypesIsLoading,
    error: statementTypesError,
  } = useGetRetirementStatementTypeQuery({});

  // FETCH DATA
  useEffect(() => {
    if (statementTypesIsSuccess) {
      setStatementTypes(statementTypesItems.itemList);
    }
  }, [statementTypesIsSuccess, statementTypesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (statementTypesError) {
      console.log(statementTypesError);
    }
  }, [statementTypesError]);

  return {
    statementTypes,
    statementTypesIsFetching,
    statementTypesIsLoading,
  };
};

// PENSIONARY STATUS LOOK UP LOGIC
const useFetchPensionaryStatus = ({
  pensionaryStatusCategory,
  pensionaryStatusIsDead = null,
}: {
  pensionaryStatusCategory: string;
  pensionaryStatusIsDead: string | null;
}) => {
  const [pensionaryStatus, setPensionaryStatus] = useState([]);

  // GET DATA
  const {
    data: pensionaryStatusItems,
    isSuccess: pensionaryStatusIsSuccess,
    isLoading: pensionaryStatusIsLoading,
    isFetching: pensionaryStatusIsFetching,
    error: pensionaryStatusError,
  } = useGetPensionaryStatusQuery({
    pensionaryStatusCategory,
    pensionaryStatusIsDead,
  });

  // FETCH DATA
  useEffect(() => {
    if (pensionaryStatusIsSuccess) {
      setPensionaryStatus(pensionaryStatusItems.itemList);
    }
  }, [pensionaryStatusIsSuccess, pensionaryStatusItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (pensionaryStatusError) {
      console.log(pensionaryStatusError);
    }
  }, [pensionaryStatusError]);

  return {
    pensionaryStatus,
    pensionaryStatusIsLoading,
    pensionaryStatusIsFetching,
  };
};

// RELATIONSHIP LOOK UP LOGIC
const useFetchRelationship = () => {
  const [relationships, setRelationships] = useState([]);

  // GET DATA
  const {
    data: relationshipItems,
    isSuccess: relationshipIsSuccess,
    isLoading: relationshipIsLoading,
    isFetching: relationshipIsFetching,
    error: relationshipError,
  } = useGetRelationshipQuery({});

  // FETCH DATA
  useEffect(() => {
    if (relationshipIsSuccess) {
      setRelationships(relationshipItems.itemList);
    }
  }, [relationshipIsSuccess, relationshipItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (relationshipError) {
      console.log(relationshipError);
    }
  }, [relationshipError]);

  return {
    relationships,
    relationshipIsLoading,
    relationshipIsFetching,
  };
};

const useFetchOrganizations = ({ organizationID = undefined }) => {
  const [organizations, setOrganizations] = useState([]);

  // GET DATA
  const {
    data: organizationItems,
    isSuccess: organizationIsSuccess,
    isLoading: organizationIsLoading,
    isFetching: organizationIsFetching,
    error: organizationError,
  } = useGetRetiredOrganizationQuery({ organizationID });

  // FETCH DATA
  useEffect(() => {
    if (organizationIsSuccess) {
      setOrganizations(organizationItems.itemList);
    }
  }, [organizationIsSuccess, organizationItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (organizationError) {
      console.log(organizationError);
    }
  }, [organizationError]);

  return {
    organizations,
    organizationIsLoading,
    organizationIsFetching,
  };
};

// REQUEST TYPE LOOK UP LOGIC
const useFetchRequestType = (role: string) => {
  const [requestTypes, setRequestTypes] = useState([]);

  // GET DATA
  const {
    data: requestTypesItems,
    isSuccess: requestTypesIsSuccess,
    isLoading: requestTypesIsLoading,
    isFetching: requestTypesIsFetching,
    error: requestTypesError,
  } = useGetRequestTypeQuery(role);

  // FETCH DATA
  useEffect(() => {
    if (requestTypesIsSuccess) {
      setRequestTypes(requestTypesItems.itemList);
    }
  }, [requestTypesIsSuccess, requestTypesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (requestTypesError) {
      console.log(requestTypesError);
    }
  }, [requestTypesError]);

  return {
    requestTypes,
    requestTypesIsLoading,
    requestTypesIsFetching,
  };
};

// FRACTION TYPE LOOK UP LOGIC
const useFetchFractionType = () => {
  const [fractionTypes, setFractionTypes] = useState([]);

  // GET DATA
  const {
    data: fractionTypesItems,
    isSuccess: fractionTypesIsSuccess,
    isLoading: fractionTypesIsLoading,
    isFetching: fractionTypesIsFetching,
    error: fractionTypesError,
  } = useGetFractionTypeQuery({});

  // FETCH DATA
  useEffect(() => {
    if (fractionTypesIsSuccess) {
      setFractionTypes(fractionTypesItems.itemList);
    }
  }, [fractionTypesIsSuccess, fractionTypesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (fractionTypesError) {
      console.log(fractionTypesError);
    }
  }, [fractionTypesError]);

  return {
    fractionTypes,
    fractionTypesIsLoading,
    fractionTypesIsFetching,
  };
};

// PERSONNEL STATEMENT OFF TYPE LOOK UP LOGIC
const useFetchPersonnelStatementOffType = () => {
  const [personnelStatementOffTypes, setPersonnelStatementOffTypes] = useState(
    []
  );

  // GET DATA
  const {
    data: personnelStatementOffTypesItems,
    isSuccess: personnelStatementOffTypesIsSuccess,
    isLoading: personnelStatementOffTypesIsLoading,
    isFetching: personnelStatementOffTypesIsFetching,
    error: personnelStatementOffTypesError,
  } = useGetPersonnelStatementOffTypeQuery({});

  // FETCH DATA
  useEffect(() => {
    if (personnelStatementOffTypesIsSuccess) {
      setPersonnelStatementOffTypes(personnelStatementOffTypesItems.itemList);
    }
  }, [personnelStatementOffTypesIsSuccess, personnelStatementOffTypesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (personnelStatementOffTypesError) {
      console.log(personnelStatementOffTypesError);
    }
  }, [personnelStatementOffTypesError]);

  return {
    personnelStatementOffTypes,
    personnelStatementOffTypesIsLoading,
    personnelStatementOffTypesIsFetching,
  };
};

// REPORT GENERATOR TABLES LOOK UP LOGIC
const useFetchReportGeneratorTables = (role: string) => {
  const [reportGeneratorTables, setReportGeneratorTables] = useState([]);

  // GET DATA
  const {
    data: reportGeneratorTablesItems,
    isSuccess: reportGeneratorTablesIsSuccess,
    isLoading: reportGeneratorTablesIsLoading,
    isFetching: reportGeneratorTablesIsFetching,
    error: reportGeneratorTablesError,
  } = useGetTablesQuery(role);

  // FETCH DATA
  useEffect(() => {
    if (reportGeneratorTablesIsSuccess) {
      setReportGeneratorTables(reportGeneratorTablesItems.itemList);
    }
  }, [reportGeneratorTablesIsSuccess, reportGeneratorTablesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (reportGeneratorTablesError) {
      console.log(reportGeneratorTablesError);
    }
  }, [reportGeneratorTablesError]);

  return {
    reportGeneratorTables,
    reportGeneratorTablesIsLoading,
    reportGeneratorTablesIsFetching,
  };
};

// REQUEST ATTACHMENT TYPES LOOK UP LOGIC
const useFetchRequestAttachmentTypes = (requestTypeID: string) => {
  const [requestAttachmentTypes, setRequestAttachmentTypes] = useState([]);

  // GET DATA
  const {
    data: requestAttachmentTypesItems,
    isSuccess: requestAttachmentTypesIsSuccess,
    isLoading: requestAttachmentTypesIsLoading,
    isFetching: requestAttachmentTypesIsFetching,
    error: requestAttachmentTypesError,
  } = useGetRequestTypeAttachmentQuery(requestTypeID);

  // FETCH DATA
  useEffect(() => {
    if (requestAttachmentTypesIsSuccess) {
      setRequestAttachmentTypes(requestAttachmentTypesItems.itemList);
    }
  }, [requestAttachmentTypesIsSuccess, requestAttachmentTypesItems]);

  // HANDLE ERROR
  useEffect(() => {
    if (requestAttachmentTypesError) {
      console.log(requestAttachmentTypesError);
    }
  }, [requestAttachmentTypesError]);

  return {
    requestAttachmentTypes,
    requestAttachmentTypesIsLoading,
    requestAttachmentTypesIsFetching,
  };
};

// PAY ITEM TYPE LOOK UP LOGIC
const useFetchPayItemType = (payItemtypeID: string | undefined = undefined) => {
  const [payItemTypes, setPayItemTypes] = useState([]);

  // GET DATA
  const {
    data: payItemTypesItems,
    isSuccess: payItemTypesIsSuccess,
    isLoading: payItemTypesIsLoading,
    isFetching: payItemTypesIsFetching,
  } = useGetPayItemTypeQuery(payItemtypeID);

  // FETCH DATA
  useEffect(() => {
    if (payItemTypesIsSuccess) {
      setPayItemTypes(payItemTypesItems.itemList);
    }
  }, [payItemTypesIsSuccess, payItemTypesItems]);

  return {
    payItemTypes,
    payItemTypesIsLoading,
    payItemTypesIsFetching,
  };
};

export {
  useFetchRetirementStatementTypes,
  useFetchPensionaryStatus,
  useFetchLookUpData,
  useFetchRelationship,
  useFetchOrganizations,
  useFetchRequestType,
  useFetchFractionType,
  useFetchPersonnelStatementOffType,
  useFetchReportGeneratorTables,
  useFetchRequestAttachmentTypes,
  useFetchPayItemType,
};
