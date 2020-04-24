import i18next from "i18next";
//import * as RNLocalize from "react-native-localize"
import {initReactI18next} from "react-i18next";
import fr from '../assets/language/fr'
import en from '../assets/language/en'
//import { Localization } from "expo";
import * as Localization from 'expo-localization';


const fallbackLanguage = "fr";
const supportedLanguages = ["en", "fr"];
const resources = {
    en: {
        translation: en
    },
    fr: {
        translation: fr
    }
};
/*
const getLanguage = () => {
const language = RNLocalize.findBestAvailableLanguage(supportedLanguages);

return language ? language.languageTag : fallbackLanguage
};
*/
const languageDetector = {
    type: 'languageDetector',
    async: false,
    detect: () => getLanguage(),
};

i18next
    //.use(languageDetector)
    .use(initReactI18next)
    .init({
        resources: resources,
        lng: Localization.locale,
        fallbackLng: fallbackLanguage,
        debug: true,
        interpolation: {
            escapeValue: false
        },
    });

