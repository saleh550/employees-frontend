import { useTranslation } from "react-i18next"

const Title = () => {
    const {t} = useTranslation();
    return (
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">{t("LOGIN_AS_ADMIN")}</h2>
            <p className="mt-2 text-lg/8 text-gray-600">{t("LOGIN_AS_ADMIN_DESC")}</p>
        </div>
    )
}

export default Title