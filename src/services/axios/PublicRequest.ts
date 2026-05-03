import axios, { AxiosError, type AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

const client = axios.create({ baseURL: baseURL });

export const publicRequest = ({ ...options }) => {
  //   const token= window.localStorage.getItem("access_token")

  //     client.defaults.headers.common.Authorization = `Bearer ${token}`;

  const onSuccess = (response: AxiosResponse) => {
    //   console.log("axios :: response => ", response);

    return response;
  };

  const onError = (error: AxiosError) => {
    console.log("axios :: responseError => ", error);

    throw error;
  };

  return client(options).then(onSuccess).catch(onError);
};