import { type FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../store/useAuth";
import { useState } from "react";
import { login } from "../../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const loginSchema = z.object({
    username: z.string().min(1, { message: "THIS_FIELD_CAN'T_BE_EMPTY" }),
    password: z
        .string()
        .min(1, { message: "THIS_FIELD_CAN'T_BE_EMPTY" })
        .max(20),
});
type loginSchemaType = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<loginSchemaType>({ resolver: zodResolver(loginSchema) });

    const onSubmit = async (data: FieldValues) => {
        setIsLoading(true);
        try {
            await login(data, setIsLoading, navigate, setUser,t);
        } catch (error) {
            console.log("error:", error);
        }
        reset();
    };
    return (
        <>
            <form
                className={`mx-auto mt-8 max-w-xl sm:mt-20 ${isLoading && "pointer-events-none bg-opacity-50 animate-pulse"
                    }`}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label
                            className={`block ${errors.username && "text-red-500"
                                } text-sm/6 font-semibold text-gray-900`}
                        >
                            {t("USERNAME")}
                        </label>
                        <div className="mt-2.5">
                            <input
                                {...register("username", { required: true })}
                                type="username"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline  -outline-offset-1 outline-gray-300 placeholder:text-gray-400  focus:outline-2 focus:-outline-offset-2 focus:outline-sunny-600"
                            />
                            {errors.username && (
                                <p className="text-red-500 ">{t(errors.username.message ?? "")}</p>
                            )}
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label
                            className={`block ${errors.password && "text-red-500"
                                } text-sm/6 font-semibold text-gray-900`}
                        >
                            {t("PASSWORD")}
                        </label>
                        <div className="mt-2.5">
                            <input
                                {...register("password", { required: true })}
                                type="password"
                                name="password"
                                id="password"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline  -outline-offset-1 outline-gray-300 placeholder:text-gray-400  focus:outline-2 focus:-outline-offset-2 focus:outline-sunny-600"
                            />
                            {errors.password && (
                                <p className="text-red-500 ">{t(errors.password.message??"")}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <button
                        type="submit"
                        className="block w-full rounded-md bg-sunny-600 px-3.5 py-2.5 text-center text-sm font-semibold  shadow-sm hover:bg-sunny-500  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sunny-600"
                    >
                        Login
                    </button>
                </div>
            </form>
        </>
    );
};

export default LoginForm;