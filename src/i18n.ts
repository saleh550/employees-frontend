import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import  LanguageDetector from 'i18next-browser-languagedetector'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)

import translationEN from './locale/translationEN.json'
import translationAR from './locale/translationAR.json';
import translationHB from './locale/translationHE.json';
const resources = {
  en: {
    translation: translationEN
  },
  ar: {
    translation: translationAR
  },
  he: {
    translation:translationHB
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    supportedLngs:['en','ar','he','uz'],
    resources,
    fallbackLng:'en',
    detection:{
      order:['cookie','htmlTag','localStorage','path','subdomain'],
      caches:['cookie']
    },
    interpolation: {
      escapeValue: false 
    },
  })
  export default i18n;