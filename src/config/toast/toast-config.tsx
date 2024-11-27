// IMPORTS
import { toast, ToastContainer, ToastContainerProps } from "react-toastify";

const toastProviderOptions: ToastContainerProps = {
  autoClose: 2000,
  style: {
    fontSize: "0.9rem",
    textAlign: "center",
    fontFamily: "IranYekan",
  },

  toastClassName: "toast-message",
};

export const toastConfig = {
  registerProvider: () => <ToastContainer {...toastProviderOptions} />,
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  warning: (message: string) => toast.warning(message),
  info: (message: string) => toast.info(message),
};
