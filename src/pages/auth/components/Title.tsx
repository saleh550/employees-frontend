import { useTranslation } from "react-i18next"

const Title = () => {
    const {t} = useTranslation();
    return (
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{t("LOGIN")}</h2>
            {/* <p className="mt-2 text-lg/8 text-gray-600">AgriSmart login: Secure, quick access to manage your agricultural needs efficiently</p> */}
        </div>
    )
}

export default Title