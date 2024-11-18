// REACT IMPORTS
import { useEffect } from "react";

// LIBRARIES
import { toast } from "react-toastify";

// TYPES
import { ApiError } from "@/shared/types/apiErrorTypes";

const useErrorHandling = (error: ApiError) => {
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || error.error, {
        autoClose: 2000,
      });
    }
  }, [error]);
};

export default useErrorHandling;
