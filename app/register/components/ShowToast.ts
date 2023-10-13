import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToastSuccess = (userAlert: string) => {
  toast.success(userAlert, {
    position: "bottom-center",
    autoClose: 2400,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
  });
};

export const showToastFail = (userAlert: string) => {
  toast.error(userAlert, {
    position: "bottom-center",
    autoClose: 2400,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
  });
};
