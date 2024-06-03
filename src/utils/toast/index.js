import { toast } from "react-toastify";

const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  progress: undefined,
  theme: "colored",
};

const toastContainerConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  theme: "colored",
};

const toastError = (message) => toast.error(message, toastConfig);

const toastSuccess = (message) => toast.success(message, toastConfig);

const toastWarning = (message) => toast.warn(message, toastConfig);

const toastInfo = (message) => toast.info(message, toastConfig);

export {
  toastConfig,
  toastContainerConfig,
  toastError,
  toastSuccess,
  toastWarning,
  toastInfo,
};
