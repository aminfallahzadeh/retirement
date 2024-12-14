// IMPORTS
import { useEffect, FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const withRouteGuard = (Component: FC, requiredParams: string[]) => {
  return () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const missingParams = requiredParams.filter(
      (param) => !searchParams.get(param)
    );

    useEffect(() => {
      if (missingParams.length > 0) {
        navigate(-1);
      }
    }, [navigate, missingParams]);

    return missingParams.length === 0 ? <Component /> : null;
  };
};
