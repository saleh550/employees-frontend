import axios, { AxiosError, type AxiosResponse } from "axios";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const client = axios.create({ baseURL: baseURL });

export const employeePrivateRequest = ({ ...options }) => {
  let accessToken;
  const localstorage = window.localStorage.getItem("employee-auth");
  if (localstorage) {
    const auth = JSON.parse(localstorage);
    accessToken = auth.state.employeeAccessToken;
  } else {
    toast.error("no data in local storage");
  }

  client.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  const onSuccess = (response: AxiosResponse) => {
    
    return response;
  };

  const onError = (error: AxiosError) => {
    console.log("axios :: responseError => ", error);

    throw error;
  };

  return client(options).then(onSuccess).catch(onError);
};