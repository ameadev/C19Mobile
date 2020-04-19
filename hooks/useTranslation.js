import {useTranslation as i18nHook} from "react-i18next";

export const useTranslation = () => {
    const { t, i18n } = i18nHook();

    return {
        t: (translationKey) => {
            return t(translationKey);
        },
        i18n,
    };
};
