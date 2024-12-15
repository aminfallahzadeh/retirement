// IMPORTS
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "@/hooks/usePreTypesHooks";

export const withRouteGuard = (
  Component: FC,
  requiredParams: string[] = []
) => {
  return () => {
    const { token } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // State to prevent rendering until checks are complete
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      if (!token) {
        navigate("/retirement/", { replace: true });
        return;
      }

      if (requiredParams.length > 0) {
        const missingParams = requiredParams.filter(
          (param) => !searchParams.get(param)
        );

        if (missingParams.length > 0) {
          navigate("/retirement/cartable", { replace: true });
          return;
        }
      }

      // Pass the guard checks
      setIsAuthorized(true);
    }, [token, searchParams, navigate]);

    // Render only if authorized
    return isAuthorized ? <Component /> : null;
  };
};
