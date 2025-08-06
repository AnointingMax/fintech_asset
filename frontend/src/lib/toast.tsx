import { type ReactNode } from "react";
import { toast, type ExternalToast } from "sonner";


export const showSuccessToast = (
   message: string | ReactNode,
   data?: ExternalToast,
) =>
   toast.success(message, {
      descriptionClassName: "!text-gray-500",
      ...data,
   });

export const showErrorToast = (
   message: string | ReactNode,
   data?: ExternalToast,
) =>
   toast.error(message, {
      descriptionClassName: "!text-gray-500",
      ...data,
   });

export const showInfoToast = (
   message: string | ReactNode,
   data?: ExternalToast,
) =>
   toast.info(message, {
      descriptionClassName: "!text-gray-500",
      ...data,
   });

export const showLoadingToast = (
   message: string | ReactNode,
   data?: ExternalToast,
) => toast.loading(message, data);

export const showWarningToast = (
   message: string | ReactNode,
   data?: ExternalToast,
) =>
   toast.warning(message, {
      descriptionClassName: "!text-gray-500",
      ...data,
   });

export const dismissToast = (id?: number | string) => toast.dismiss(id);