/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from "axios"
import { getFromLocalStorage, removeFromLocalStorage } from "./lib/utils";
import { showErrorToast } from "./lib/toast";

export const api = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
   headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use((config) => {
   const token = getFromLocalStorage("token");

   if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
   }

   return config;
}, undefined)

api.interceptors.response.use((response) => response.data, (error: AxiosError) => {
   const errorMessage = (error.response as any)?.data.error || (error.response as any)?.data.message || error.response;

   if (["ERR_NETWORK", "ECONNABORTED", "ETIMEDOUT"].includes(error.code!)) {
      showErrorToast("Network error", {
         description: "Please check your connection and try again",
         closeButton: true,
      });

      return Promise.reject(errorMessage);
   }

   if (error?.response?.status === 401) {
      removeFromLocalStorage("token");
      removeFromLocalStorage("user");

      showErrorToast("Session expired", {
         description: "Please login again",
         closeButton: true,
      });

      window.location.reload()

      return Promise.reject(errorMessage);
   }

   showErrorToast(errorMessage || "Something went wrong", { closeButton: true });

   return Promise.reject(errorMessage);
})