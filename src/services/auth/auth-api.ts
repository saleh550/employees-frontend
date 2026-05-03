import { type FieldValues } from "react-hook-form";
import { publicRequest } from "../axios/PublicRequest";
import { privateRequest } from "../axios/PrivateRequest";
// import { privateRequest } from "../axios/PrivateRequest";

export const LoginApi = (data: FieldValues) => {
  return publicRequest({
    url: "/api/users/login",
    method: "POST",
    data: data,
  });
};
export const me = () => {
  return privateRequest({
    url: "api/users/me/",
    method: "GET",
  });
};
// export const GetMe = async () => {
//   const respone = await privateRequest({
//     url: "/auth/get/me",
//     method: "POST",
//   });

//   return respone;
// };
// export const ResetPasswordApi = async (data: FieldValues) => {
//   const respone = await privateRequest({
//     url: "/auth/reset-password",
//     method: "POST",
//     data,
//   });

//   return respone;
// };
