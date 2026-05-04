import type { FieldValues } from "react-hook-form";
import type { UserType } from "../../src/types/types";
import type { SetStateAction } from "react";
import type { NavigateFunction } from "react-router-dom";
import { LoginApi } from "../../src/services/auth/auth-api";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { TFunction } from "i18next";

export const login = async (
  data: FieldValues,
  setIsLoading: (value: SetStateAction<boolean>) => void,
  navigate: NavigateFunction,
  setUser: ({
    accessToken,
    user,
  }: {
    accessToken: string;
    user: UserType;
  }) => void,
  t: TFunction<"translation", undefined>

): Promise<any | null> => {
  try {
    const res = await LoginApi(data);
    setIsLoading(false);
    const {token,...user} = res?.data;
    setUser({ accessToken: token, user });
    navigate("/");
    return res?.data;   
  } catch (err: AxiosError | any) {
    setIsLoading(false);
    console.log(err);
    toast.error(t(err?.response?.data?.message) || t("SOMETHING_WENT_WRONG"));
    return null;
  }
};