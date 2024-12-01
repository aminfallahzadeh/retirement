// IMPORTS
import { logout } from "@/features/auth/authSlice";
import { useLogoutMutation } from "@/features/auth/authApi";
import { useAppSelector, useAppDispatch } from "./usePreTypesHooks";
import { toastConfig } from "@/config/toast";

const useLogout = () => {
  const dispatch = useAppDispatch();
  const [logoutApiCall, { isLoading: logoutLoading }] = useLogoutMutation();
  const { refreshToken } = useAppSelector((state) => state.auth);
  const logoutHandler = async () => {
    const res = await logoutApiCall({
      refreshToken,
    });
    dispatch(logout());
    console.log("LOGOUT response:", res);
    toastConfig.success(res.data.message);
  };

  return { logoutHandler, logoutLoading };
};

export default useLogout;
